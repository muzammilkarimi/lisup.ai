import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

    if (databaseUrl) {
      // Connect to Neon serverless database
      const sql = neon(databaseUrl);
      
      // Auto-create waitlist table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;

      // Insert email, ignoring if it already exists (on conflict)
      await sql`
        INSERT INTO waitlist (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING
      `;
      
      console.log(`[Waitlist DB] Successfully saved: ${email}`);
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Waitlist storage is not configured" },
          { status: 503 }
        );
      }

      // Local fallback: Save to waitlist.csv at the root of the project
      const filePath = path.join(process.cwd(), "waitlist.csv");
      
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "Timestamp,Email\n");
      }
      
      const record = `"${new Date().toISOString()}","${email.replace(/"/g, '""')}"\n`;
      fs.appendFileSync(filePath, record);

      console.log(`[Waitlist Local CSV Fallback] Saved: ${email}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
