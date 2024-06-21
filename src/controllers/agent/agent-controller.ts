//@ts-nocheck
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AgentModel from "../../models/agent";
import Property from "../../models/property";
import { validatePassword } from "../../helpers/passwordValidator";

// Register agent
export const registerAgent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    phoneNumber,
  } = req.body;

  try {
    let agent = await AgentModel.findOne({ email });
    if (agent) {
      res
        .status(400)
        .json({ status: false, message: "Agent already registered" });
      return;
    }

    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ status: false, message: "Passwords do not match" });
      return;
    }

    if (!validatePassword(password)) {
      res
        .status(400)
        .json({
          status: false,
          message:
            "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one symbol (@, #, !, %, ^)",
        });
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      res
        .status(400)
        .json({
          status: false,
          message: "Phone number must be exactly 10 digits long",
        });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    agent = new AgentModel({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await agent.save();
    res
      .status(201)
      .json({ status: true, message: "Agent registered successfully" });
  } catch (error) {
    console.error("Error registering agent:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Login agent
export const loginAgent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find agent by email
    const agent = await AgentModel.findOne({ email });

    if (!agent) {
      res.status(401).json({ status: false, message: "Agent not found" });
      return;
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, agent.password);

    if (!isMatch) {
      res.status(401).json({ status: false, message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: agent._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("jwt", token, { httpOnly: true, secure: true });
    console.log(token);
    return res
      .status(200)
      .json({ status: true, message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ status: true, message: "Internal server error" });
  }
};

// Get properties by agent
export const getPropertiesByAgent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const agentId = req.params.id;

  try {
    // Log the received agentId
    console.log("Fetching properties for agentId:", agentId);

    const agent = await AgentModel.findById(agentId);
    if (!agent) {
      res.status(404).json({ status: false, message: "Agent not found" });
      return;
    }

    const propertyCount = await Property.countDocuments({ agentId: agent._id });
    const properties = await Property.find({ agentId });

    res.status(200).json({ status: true, agent, propertyCount, properties });
  } catch (error) {
    console.error("Error getting properties by agent:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Logout agent
export const LogoutAgent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out agent:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export default {
  registerAgent,
  loginAgent,
  getPropertiesByAgent,
  LogoutAgent,
};
