import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passcode, subject, message, link } = body;

    const correctPasscode = process.env.ADMIN_PASSCODE;
    if (!correctPasscode || passcode !== correctPasscode) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!subject || (!message && !link)) {
      return NextResponse.json({ error: "Missing broadcast details" }, { status: 400 });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase connection missing" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: registrants, error } = await supabase
      .from("registrations")
      .select("email, full_name");

    if (error) throw error;
    if (!registrants || registrants.length === 0) {
      return NextResponse.json({ message: "No registrants found to email." }, { status: 200 });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER || "smtp.gmail.com",
      port: Number(process.env.MAIL_PORT) || 587,
      secure: process.env.MAIL_PORT === "465",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // We will send individually to avoid spam filters catching a massive BCC block
    let successCount = 0;
    
    for (const person of registrants) {
      if (!person.email) continue;

      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5; padding: 40px 20px;">
              <tr>
                  <td align="center">
                      <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align:left;">
                          <!-- Header -->
                          <tr>
                              <td style="background-color:#020617; padding:35px 40px; text-align:center;">
                                  <h1 style="color:#2dd4bf; margin:0; font-size:24px; font-weight:800; letter-spacing:1px; text-transform:uppercase;">EDUSYNC UPDATE</h1>
                              </td>
                          </tr>
                          <!-- Body -->
                          <tr>
                              <td style="padding:40px;">
                                  <p style="margin-top:0; margin-bottom:20px; font-size:16px; color:#334155; line-height:1.6;">
                                      Hi ${person.full_name},
                                  </p>
                                  <p style="margin-top:0; margin-bottom:30px; font-size:16px; color:#334155; line-height:1.6;">
                                      ${message.replace(/\n/g, '<br>')}
                                  </p>
                                  ${link ? `
                                  <table border="0" cellspacing="0" cellpadding="0" style="margin-top:10px; margin-bottom:30px; width: 100%;">
                                      <tr>
                                          <td align="center">
                                              <a href="${link}" style="display:inline-block; background-color:#2dd4bf; color:#020617; text-decoration:none; padding:15px 35px; border-radius:8px; font-weight:bold; font-size:16px;">
                                                  Join the Live Stream
                                              </a>
                                          </td>
                                      </tr>
                                  </table>
                                  ` : ''}
                                  <p style="margin-top:0; margin-bottom:0; font-size:14px; color:#64748b; line-height:1.6;">
                                      Best regards,<br>
                                      <strong>The EduSync Team</strong>
                                  </p>
                              </td>
                          </tr>
                          <!-- Footer -->
                          <tr>
                              <td style="background-color:#f8fafc; padding:20px; text-align:center; border-top: 1px solid #e2e8f0;">
                                  <p style="margin:0; font-size:12px; color:#94a3b8;">
                                      You are receiving this because you registered for the EduSync Masterclass.<br>
                                      &copy; ${new Date().getFullYear()} EduSync. All rights reserved.
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
      `;

      try {
        await transporter.sendMail({
          from: `"EduSync Events" <${process.env.MAIL_USERNAME}>`,
          to: person.email,
          subject: subject,
          html: htmlContent,
        });
        successCount++;
        // Very small delay to prevent SMTP throttling
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (err) {
        console.error("Failed to send to", person.email, err);
      }
    }

    return NextResponse.json({ 
      success: true, 
      sentCount: successCount, 
      totalRegistrants: registrants.length 
    }, { status: 200 });

  } catch (error) {
    console.error("Broadcast error:", error);
    return NextResponse.json({ error: "Failed to broadcast email" }, { status: 500 });
  }
}
