import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

// ── Types ─────────────────────────────────────────────────────────────
interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
}

// ── Supabase Client ──────────────────────────────────────────────────
// Checking multiple variable names just in case they used VITE_ or NEXT_PUBLIC_
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// ── Gmail transporter (uses App Password from .env) ───────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
}

// ── Email to YOU (admin notification) ────────────────────────────────
function buildAdminEmail(data: RegistrationData) {
  return {
    from: `"EduSync Registrations" <${process.env.MAIL_USERNAME}>`,
    to: process.env.MAIL_USERNAME,
    subject: `🎉 New Registration: ${data.fullName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#020617;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:16px;border:1px solid rgba(45,212,191,0.2);overflow:hidden;margin:0 auto;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:#134e4a;padding:32px;text-align:center;border-bottom:1px solid rgba(45,212,191,0.15);">
                      <div style="display:inline-block;background:rgba(45,212,191,0.1);border:1px solid rgba(45,212,191,0.3);border-radius:999px;padding:6px 16px;margin-bottom:12px;">
                        <span style="color:#2dd4bf;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">New Registration</span>
                      </div>
                      <h1 style="color:#f8fafc;font-size:24px;font-weight:800;margin:0;">EduSync Webinar</h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:32px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:16px;background:#1e293b;border-bottom:1px solid #334155;">
                            <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;margin:0 0 4px;">Full Name</p>
                            <p style="color:#f8fafc;font-size:16px;font-weight:600;margin:0;">${data.fullName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:16px;background:#1e293b;border-bottom:1px solid #334155;">
                            <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;margin:0 0 4px;">Email</p>
                            <p style="color:#2dd4bf;font-size:15px;margin:0;">${data.email}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:16px;background:#1e293b;">
                            <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;margin:0 0 4px;">Phone</p>
                            <p style="color:#f8fafc;font-size:15px;margin:0;">${data.phone.trim() || 'Not provided'}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };
}

// ── Email to the REGISTRANT (confirmation) ────────────────────────────
function buildConfirmationEmail(data: RegistrationData) {
  return {
    from: `"EduSync Webinar" <${process.env.MAIL_USERNAME}>`,
    to: data.email,
    subject: "✅ You're Registered! Mastering Time Management Webinar",
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:20px;background:#020617;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table width="580" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:12px;border:1px solid #1e293b;margin:0 auto;text-align:left;">
                  
                  <tr>
                    <td style="background:#134e4a;padding:40px 32px;text-align:center;border-radius:12px 12px 0 0;">
                      <h1 style="color:#ffffff;font-size:26px;margin:0;">You're In! ✅</h1>
                      <p style="color:#2dd4bf;font-size:15px;margin:10px 0 0;">Your seat is confirmed.</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:32px;">
                      <p style="color:#ffffff;font-size:16px;margin:0 0 16px;">Hey <strong>${data.fullName}</strong>,</p>
                      <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 24px;">
                        You're registered for <strong>Mastering Time Management: Introducing EduSync</strong>. We're pumped to have you!
                      </p>

                      <!-- Details Table -->
                      <table width="100%" cellpadding="16" cellspacing="0" style="background:#1e293b;border-radius:8px;margin-bottom:24px;">
                        <tr>
                          <td style="color:#cbd5e1;font-size:14px;border-bottom:1px solid #334155;">
                            📅 &nbsp;<strong>March 16, 2026</strong>
                          </td>
                        </tr>
                        <tr>
                          <td style="color:#cbd5e1;font-size:14px;border-bottom:1px solid #334155;">
                            ⏰ &nbsp;<strong>5:00 PM – 6:00 PM</strong>
                          </td>
                        </tr>
                        <tr>
                          <td style="color:#cbd5e1;font-size:14px;">
                            💻 &nbsp;<strong>Microsoft Teams</strong> (Link sent later)
                          </td>
                        </tr>
                      </table>

                      <p style="color:#ffffff;font-size:15px;font-weight:bold;margin:0 0 16px;">Agenda:</p>
                      <table width="100%" cellpadding="8" cellspacing="0">
                        <tr><td style="color:#94a3b8;font-size:14px;">→ Managing your study workload</td></tr>
                        <tr><td style="color:#94a3b8;font-size:14px;">→ Core time management strategies</td></tr>
                        <tr><td style="color:#94a3b8;font-size:14px;">→ Practical tools to stay on track</td></tr>
                        <tr><td style="color:#94a3b8;font-size:14px;">→ Live Open Q&A</td></tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };
}

// ── API Route Handler ─────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegistrationData & { website?: string };
    const website = body.website;
    
    // Normalize and trim inputs for consistent matching
    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();

    // 0. Honeypot check (Bots fill this invisible field, humans don't)
    if (website) {
      return NextResponse.json(
        { success: true, message: "Registration processed silently." },
        { status: 200 }
      );
    }

    // Basic server-side validation
    if (!fullName || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // 1. Supabase Duplicate Check & Insertion
    if (supabase) {
      try {
        console.log(`Checking duplicate for: ${email}`);
        
        // Check if email already exists (search all rows, not just one)
        const { data: existing, error: checkError } = await supabase
          .from('registrations')
          .select('email')
          .ilike('email', email);

        if (checkError) {
          console.error("Supabase Query Error:", checkError.message);
        }

        if (existing && existing.length > 0) {
          console.warn(`Duplicate registration blocked for: ${email} (${existing.length} current entries)`);
          return NextResponse.json(
            { error: "This email is already registered." },
            { status: 400 }
          );
        }

        // Proceed with insertion (all emails saved as lowercase now)
        const { error: dbError } = await supabase
          .from('registrations')
          .insert([{ full_name: fullName, email: email, phone: phone }]);
          
        if (dbError) {
          console.error("Supabase Database Error:", dbError.message);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
        
        console.log(`New registration successful: ${email}`);
      } catch (err) {
        console.error("Critical Supabase Failure:", err);
        return NextResponse.json({ error: "System failure" }, { status: 500 });
      }
    } else {
      console.warn("Supabase credentials missing. Proceeding with email only.");
    }

    // 2. Send Emails
    if (process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD) {
      const transporter = createTransporter();
      await Promise.all([
        transporter.sendMail(buildAdminEmail({ fullName, email, phone })),
        transporter.sendMail(buildConfirmationEmail({ fullName, email, phone })),
      ]);
    } else {
      console.warn("Gmail env vars missing. Skipping email.");
    }

    return NextResponse.json(
      { success: true, message: "Registration successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to securely process registration." },
      { status: 500 }
    );
  }
}
