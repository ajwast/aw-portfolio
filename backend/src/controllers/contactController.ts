import { Request, Response } from "express";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function handleContact(req: Request, res: Response) {
  const { name, email, message } = req.body;

  // quick validation
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  const contactEmail: string = process.env.CONTACT_EMAIL || "";

  const { data, error } = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: contactEmail,
    subject: `Contact Form from ${email}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email,
  });

  if (error) {
    console.log(error);
    return res.status(500).json({ error: "Email not sent successfully" });
  }
  console.log(data);
  res.status(200).json({ message: "Email sent successfully!", success: true });
}
