"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  eventType: string;
  message: string;
}

export async function sendBookingEmails(data: BookingData) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Vercel: Missing RESEND_API_KEY.");
    return { success: false, message: "Server configuration missing." };
  }

  try {
    // --- 1. LUXURY TEMPLATE FOR NANCY (N.Touch MUA) ---
    const adminHtml = `
      <div style="font-family: 'Playfair Display', 'Times New Roman', serif; background-color: #FDF3F3; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #2E131E; color: #fff; border-radius: 40px; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.2);">
          <div style="padding: 60px 40px; text-align: center; border-bottom: 1px solid rgba(212,175,55,0.2);">
            <p style="letter-spacing: 0.3em; font-size: 10px; color: #D4AF37; margin-bottom: 10px; text-transform: uppercase;">New Transformation Request</p>
            <h1 style="color: #D4AF37; font-size: 32px; font-weight: 300; margin: 0;">N.TOUCH <span style="font-family: sans-serif; opacity: 0.5;">—</span> MUA</h1>
          </div>
          <div style="padding: 60px 40px;">
            <p style="font-size: 24px; color: #fff; margin-bottom: 40px; font-weight: 300;">You have a new <span style="color: #D4AF37;">Signature Inquiry</span> from ${data.name}.</p>
            
            <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; background: rgba(255,255,255,0.03);">
              <table style="width: 100%; font-size: 16px; color: rgba(255,255,255,0.8);">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); width: 120px; color: #D4AF37;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-weight: 500;">${data.eventType}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #D4AF37;">Date</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-weight: 500;">${data.date}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #D4AF37;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><a href="tel:${data.phone}" style="color: #fff; text-decoration: none;">${data.phone}</a></td></tr>
                <tr><td style="padding: 10px 0; color: #D4AF37;">Email</td><td style="padding: 10px 0; color: #fff;">${data.email}</td></tr>
              </table>
            </div>

            <div style="margin-top: 40px; padding: 25px; background: rgba(212,175,55,0.05); border-left: 2px solid #D4AF37; font-style: italic; color: #fff; opacity: 0.9;">
              "${data.message || "Looking for a signature Nancy Mehta look..."}"
            </div>

            <div style="margin-top: 50px; text-align: center;">
              <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="display: inline-block; background: #D4AF37; color: #2E131E; padding: 20px 45px; border-radius: 100px; text-decoration: none; font-weight: 700; letter-spacing: 0.1em; font-size: 13px; text-transform: uppercase;">WhatsApp Client Now</a>
            </div>
          </div>
          <div style="background: rgba(0,0,0,0.2); padding: 30px; text-align: center; font-size: 11px; opacity: 0.5;">
            N.Touch MUA — Professional Booking Agent
          </div>
        </div>
      </div>
    `;

    // --- 2. LUXURY TEMPLATE FOR THE CLIENT ---
    const clientHtml = `
      <div style="font-family: 'Playfair Display', 'Times New Roman', serif; background-color: #fff; padding: 40px 20px; color: #2E131E;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #F0F0F0; border-radius: 40px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #2E131E 0%, #4A2035 100%); padding: 80px 40px; text-align: center;">
            <p style="letter-spacing: 0.4em; font-size: 10px; color: #fff; opacity: 0.6; margin-bottom: 20px; text-transform: uppercase;">Your Journey with Nancy Begins</p>
            <h1 style="color: #D4AF37; font-size: 42px; font-weight: 200; margin: 0; line-height: 1;">N.Touch</h1>
            <div style="height: 1px; width: 40px; background: #D4AF37; margin: 30px auto;"></div>
            <p style="color: #fff; font-size: 14px; letter-spacing: 0.1em; opacity: 0.8;">Signature Artistry by Nancy Mehta</p>
          </div>
          
          <div style="padding: 60px 50px; line-height: 1.8;">
            <p style="font-size: 20px; margin-bottom: 30px;">Dear <span style="font-weight: 600;">${data.name}</span>,</p>
            <p style="font-size: 16px; color: #5A2D42;">Thank you for your inquiry at <strong>N.Touch</strong>. We are thrilled to be part of your special day. Nancy has received your details and we are currently reviewing her availability for your chosen date.</p>
            
            <div style="background: #FDF3F3; padding: 40px; border-radius: 30px; margin: 40px 0; border: 1px solid #FFE8EE;">
              <p style="color: #D4456B; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 25px; margin-top: 0;">Reservation Summary</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="color: #8B6552; padding: 8px 0; font-size: 14px; width: 100px;">Service</td><td style="color: #2E131E; font-weight: 600;">${data.eventType}</td></tr>
                <tr><td style="color: #8B6552; padding: 8px 0; font-size: 14px;">Date</td><td style="color: #2E131E; font-weight: 600;">${data.date}</td></tr>
              </table>
            </div>

            <p style="font-size: 15px; color: #2E131E; border-left: 3px solid #D4AF37; padding-left: 25px; margin: 40px 0;">
              Nancy will personally connect with you via <strong>WhatsApp</strong> shortly to discuss your dream look and finalize the booking.
            </p>

            <div style="text-align: center; padding-top: 30px;">
              <a href="https://ntouchmua.com" style="display: inline-block; background: #2E131E; color: #D4AF37; border: 1px solid #D4AF37; padding: 20px 45px; border-radius: 100px; text-decoration: none; font-weight: 700; letter-spacing: 0.1em; font-size: 12px; text-transform: uppercase;">Explore Lookbook</a>
            </div>
          </div>
          
          <div style="padding: 50px 40px; background: #FAFAFA; text-align: center; border-top: 1px solid #f0f0f0;">
             <p style="margin: 0; font-size: 14px; color: #2E131E; opacity: 0.4;">N.Touch by Nancy Mehta | Patna, Bihar</p>
          </div>
        </div>
      </div>
    `;

    // 1. Send Admin Email
    const { error: adminError } = await resend.emails.send({
      from: "N.Touch Bookings <bookings@ntouchmua.com>",
      to: "nancymehta247@gmail.com",
      subject: `✨ New Inquiry: ${data.name} (${data.eventType})`,
      html: adminHtml,
    });

    if (adminError) {
      console.error("Admin Resend Error:", adminError);
      return { success: false, message: adminError.message };
    }

    // 2. Send Client Email
    const { error: clientError } = await resend.emails.send({
      from: "N.Touch MUA <bookings@ntouchmua.com>",
      to: data.email,
      subject: "Welcome to N.Touch, " + data.name + "! ✨ Your glam request is received.",
      html: clientHtml,
    });

    return { success: true };

  } catch (err: any) {
    console.error("Critical booking action error:", err);
    return { success: false, message: "Server error occurred. Please contact +91 89691 84453." };
  }
}
