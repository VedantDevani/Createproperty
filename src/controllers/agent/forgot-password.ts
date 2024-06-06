import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import PasswordResetToken from '../../models/PasswordResetToken'; 
import Agent from '../../models/agent';
import dotenv from 'dotenv';

dotenv.config();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const agent = await Agent.findOne({ email });

    if (!agent) {
      res.status(404).json({ status: false, message: 'Agent not found' });
      return;
    }

    const resetToken = await bcrypt.hash(email + Date.now().toString(), 10); 

    const passwordResetToken = new PasswordResetToken({
      email,
      tokenHash: resetToken,
      created_at: new Date(),
      used: false,
    });
    await passwordResetToken.save();

    const resetLink = `http://localhost:3004/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
      <h2>You requested a password reset</h2>
      Click the link to reset your password: ${resetLink}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(200).json({
      status: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ status: false, message: "Failed to send password reset email" });
  }
};
