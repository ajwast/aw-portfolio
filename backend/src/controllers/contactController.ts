import { Request, Response } from "express";
import nodemailer from "nodemailer";

// Configure Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function handleContact(req: Request, res: Response) {
  const { name, email, message } = req.body;

  // quick validation
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  const mailInfo = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailInfo, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to send email" });
    }
    res.status(200).json({ message: "Email sent successfully!" });
  });
}
