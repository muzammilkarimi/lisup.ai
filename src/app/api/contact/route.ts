import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const { name, email, category, message } = await request.json();
    
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    
    if (!message || typeof message !== "string" || message.trim() === "") {
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
        VALUES (${name.trim()}, ${email.trim()}, ${category}, ${message.trim()})
      `;
      
      console.log(`[Contact DB] Successfully saved message from: ${email}`);
    } else {
      // Local fallback: Save to contact_messages.csv at the root of the project
      const filePath = path.join(process.cwd(), "contact_messages.csv");
      
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "Timestamp,Name,Email,Category,Message\n");
      }
      
      const record = `"${new Date().toISOString()}","${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${category.replace(/"/g, '""')}","${message.replace(/"/g, '""')}"\n`;
      fs.appendFileSync(filePath, record);

      console.log(`[Contact Local CSV Fallback] Saved message from: ${email}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
