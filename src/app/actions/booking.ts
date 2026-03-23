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
    console.error("RESEND_API_KEY is not defined.");
    return { success: false, message: "Server configuration error." };
  }

  try {
    // 1. Send Notification to Nancy (The MUA)
    await resend.emails.send({
      from: "N.Touch Bookings <bookings@ntouchmua.com>", 
      to: "nancymehta247@gmail.com",
      subject: `✨ New Booking: ${data.name} (${data.eventType})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Booking Inquiry</h2>
          <p><strong>Client Name:</strong> ${data.name}</p>
          <p><strong>Service:</strong> ${data.eventType}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          <hr />
          <p>Sent from N.Touch MUA Website</p>
        </div>
      `,
    });

    // 2. Send Luxury Confirmation to Customer
    await resend.emails.send({
      from: "N.Touch MUA <bookings@ntouchmua.com>",
      to: data.email,
      subject: "Your Glam Journey Begins! ✨ | Nancy Mehta MUA",
      react: BookingConfirmationEmail({
        name: data.name,
        date: data.date,
        eventType: data.eventType,
        message: data.message,
      }) as React.ReactElement,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Error:", error);
    return { success: false, message: "Could not send emails. Please contact us directly." };
  }
}
