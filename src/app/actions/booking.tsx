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
    console.error("Critical: RESEND_API_KEY missing.");
    return { success: false, message: "Server: Configuration missing." };
  }

  try {
    // 1. Send Admin Email (Pure HTML)
    const adminRes = await resend.emails.send({
      from: "N.Touch Bookings <bookings@ntouchmua.com>",
      to: "nancymehta247@gmail.com",
      subject: `✨ New Booking: ${data.name}`,
      html: `
        <div style="font-family: sans-serif; padding: 30px; background: #fff;">
          <h2 style="color: #2E131E;">New Booking from Website</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Service:</strong> ${data.eventType}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        </div>
      `,
    });

    if (adminRes.error) {
      console.error("Admin Resend Error:", adminRes.error);
      return { success: false, message: adminRes.error.message };
    }

    // 2. Send Client Email (Pure HTML - Premium Look)
    const clientRes = await resend.emails.send({
      from: "N.Touch MUA <bookings@ntouchmua.com>",
      to: data.email,
      subject: "Your Glam Journey Begins! ✨ | Nancy Mehta MUA",
      html: `
        <div style="font-family: serif; color: #2E131E; background: #FFFBFC; padding: 40px; border-radius: 20px; text-align: center;">
          <h1 style="letter-spacing: 0.2em; color: #D4AF37;">N.Touch MUA</h1>
          <p style="font-size: 18px;">Thank you for your inquiry, ${data.name}!</p>
          <div style="background: white; padding: 25px; border-radius: 15px; margin: 30px 0; border: 1px solid #FFE8EE;">
            <p><strong>Service:</strong> ${data.eventType}</p>
            <p><strong>Date:</strong> ${data.date}</p>
          </div>
          <p>Nancy will contact you on WhatsApp (+91 89691 84453) shortly to confirm your slot.</p>
          <p style="opacity: 0.6; font-size: 12px; margin-top: 50px;">Patna, Bihar</p>
        </div>
      `,
    });

    return { success: true };

  } catch (err: any) {
    console.error("Catch-all booking error:", err);
    return { success: false, message: "Network Error: Could not reach email server." };
  }
}
