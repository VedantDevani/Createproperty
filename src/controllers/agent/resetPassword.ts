import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Agent from "../../models/agent";
import PasswordResetToken from "../../models/PasswordResetToken";
import { validatePassword } from "../../helpers/passwordValidator";

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token, NewPassword,confirmNewPassword } = req.body;

  try {
    const passwordResetToken = await PasswordResetToken.findOne({
      tokenHash: token,
    });

    if (!passwordResetToken) {
      res
        .status(400)
        .json({ status: false, message: "Invalid or expired token" });
      return;
    }

    if (NewPassword !== confirmNewPassword) {
      res.status(400).json({ status: false, message: "Passwords do not match" });
      return;
    }

    if (!validatePassword(NewPassword)) {
      res.status(400).json({ status: false, message: "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one symbol (@, #, !, %, ^)" });
      return;
    }
    

    if (passwordResetToken.used) {
      res.status(400).json({
        status: false,
        message: "Token Used One time.",
      });
      return;
    }

    const tokenCreationTime = new Date(passwordResetToken.created_at).getTime();
    const currentTime = new Date().getTime();
    const tokenExpirationTime = tokenCreationTime + 1 * 60 * 60 * 1000; // Expires in 1 hour

    if (currentTime > tokenExpirationTime) {
      res
        .status(400)
        .json({
          status: false,
          message:
            "Password reset token has expired. Please request a new password reset.",
        });
      return;
    }

    const agent = await Agent.findOne({ email: passwordResetToken.email });
    if (!agent) {
      res.status(404).json({ status: false, message: "Agent not found" });
      return;
    }

    const hashedPassword = await bcrypt.hash(NewPassword, 10);

    agent.password = hashedPassword;
    await agent.save();

   passwordResetToken.used = true;
   await passwordResetToken.save();

   res
    .status(200)
   .json({ status: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ status: false, message: "Failed to reset password" });
  }
};
