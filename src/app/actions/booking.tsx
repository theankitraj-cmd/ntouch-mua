"use server";

import { Resend } from "resend";
import { BookingConfirmationEmail } from "@/components/emails/BookingConfirmationEmail";
import React from "react";

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
    console.error("Vercel Runtime Error: RESEND_API_KEY is not set in environment variables.");
    return { success: false, message: "Server Error: Missing Email Configuration (RESEND_API_KEY). Please add it to Vercel." };
  }

  console.log("Starting booking email chain for:", data.email);

  try {
    // 1. Alert Nancy (The MUA) - Administrative Notification
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: "N.Touch Bookings <bookings@ntouchmua.com>",
      to: "nancymehta247@gmail.com",
      subject: `✨ New Booking: ${data.name} (${data.eventType})`,
      html: `
        <div style="font-family: sans-serif; padding: 40px; color: #2E131E; background-color: #FDF3F3; border-radius: 24px;">
          <h2 style="color: #D4AF37;">New Glam Inquiry!</h2>
          <p><strong>Client Name:</strong> ${data.name}</p>
          <p><strong>Desired Service:</strong> ${data.eventType}</p>
          <p><strong>Wedding/Event Date:</strong> ${data.date}</p>
          <p><strong>Phone Number:</strong> ${data.phone}</p>
          <p><strong>Email Address:</strong> ${data.email}</p>
          <div style="background: white; padding: 20px; border-radius: 12px; margin-top: 20px; font-style: italic;">
            "${data.message || "No specific look requested yet."}"
          </div>
          <hr style="border: none; border-top: 1px solid #D4AF37; margin: 30px 0;" />
          <p style="font-size: 12px; opacity: 0.6;">Sent from N.Touch MUA Website Booking Agent.</p>
        </div>
      `,
    });

    if (adminError) {
      console.error("Resend Admin Error Response:", adminError);
      return { success: false, message: `Admin Email Error: ${adminError.message}` };
    }

    console.log("Admin notification sent success:", adminData?.id);

    // 2. Luxury Confirmation to Customer
    const { data: clientData, error: clientError } = await resend.emails.send({
      from: "N.Touch MUA <bookings@ntouchmua.com>",
      to: data.email,
      subject: "Your Glam Journey Begins! ✨ | Nancy Mehta MUA",
      react: <BookingConfirmationEmail 
        name={data.name} 
        date={data.date} 
        eventType={data.eventType} 
        message={data.message} 
      />,
    });

    if (clientError) {
      console.error("Resend Client Error Response:", clientError);
      // We still return true because Nancy (the business owner) was notified.
      // But we log it.
    }

    return { 
      success: true, 
      id: adminData?.id,
      message: "Success! We've received your booking and notified Nancy." 
    };

  } catch (err: any) {
    console.error("Critical server-side catch during booking:", err);
    return { 
      success: false, 
      message: "Server Error: Could not connect to mail service. Please WhatsApp Nancy at +91 89691 84453." 
    };
  }
}
