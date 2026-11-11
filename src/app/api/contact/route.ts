import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CATEGORIES = new Set(["general", "support", "partnership", "press"]);

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 s"),
      analytics: true,
    })
  : null;

export async function POST(request: Request) {
  if (ratelimit) {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return new Response("Too many requests", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  try {
    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const rawCategory = typeof body?.category === "string" ? body.category : "general";
    const category = VALID_CATEGORIES.has(rawCategory) ? rawCategory : "general";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

    if (databaseUrl) {
      // Connect to Neon serverless database
      const sql = neon(databaseUrl);
      
      // Auto-create contact_messages table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          category TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;

      // Insert message into table
      await sql`
        INSERT INTO contact_messages (name, email, category, message)
        VALUES (${name}, ${email}, ${category}, ${message})
      `;
      
      console.log(`[Contact DB] Successfully saved message from: ${email}`);
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Contact storage is not configured" },
          { status: 503 }
        );
      }

      // Local fallback: Save to contact_messages.csv at the root of the project
      const filePath = path.join(process.cwd(), "contact_messages.csv");
      
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "Timestamp,Name,Email,Category,Message\n");
      }
      
      const sanitizeForCsv = (value: string) => {
        const dangerousChars = ["=", "+", "-", "@"];
        if (dangerousChars.some(char => value.startsWith(char))) {
          return `'${value}`;
        }
        return value.replace(/"/g, '""');
      };

      const record = `"${new Date().toISOString()}","${sanitizeForCsv(name)}","${sanitizeForCsv(email)}","${sanitizeForCsv(category)}","${sanitizeForCsv(message)}"\n`;
      fs.appendFileSync(filePath, record);

      console.log(`[Contact Local CSV Fallback] Saved message from: ${email}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", JSON.stringify(error, null, 2));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
