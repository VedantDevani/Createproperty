import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import AgentModel from "../../models/agent";
import Property from "../../models/property";

// Register agent
export const registerAgent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    licenseNumber,
    agencyName,
    agencyAddress,
    yearsOfExperience,
    specializations,
    profilePicture,
    governmentID,
    linkedInProfile,
    website,
    marketingPreferences,
    preferredCommunicationChannels,
    languagesSpoken,
    serviceAreas,
    professionalBio,
    certificationsAwards,
    references,
  } = req.body;

  try {
    let agent = await AgentModel.findOne({ email });
    if (agent) {
      res
        .status(400)
        .json({ status: false, message: "Agent already registered" });
      return;
    }

    agent = new AgentModel({
      fullName,
      email,
      phoneNumber,
      password,
      licenseNumber,
      agencyName,
      agencyAddress,
      yearsOfExperience,
      specializations,
      profilePicture,
      governmentID,
      linkedInProfile,
      website,
      marketingPreferences,
      preferredCommunicationChannels,
      languagesSpoken,
      serviceAreas,
      professionalBio,
      certificationsAwards,
      references,
    });

    const salt = await bcrypt.genSalt(10);
    agent.password = await bcrypt.hash(password, salt);

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
    const agent = await AgentModel.findOne({ email });
    if (!agent) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const payload = { id: agent._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: true, token });
  } catch (error) {
    console.error("Error logging in agent:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Get Agent Details
export const getAgentDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const agentId = req.params.id;

  try {
    const agent = await AgentModel.findById(agentId);
    if (!agent) {
      res.status(404).json({ status: false, message: "Agent not found" });
      return;
    }
    const propertyCount = await Property.countDocuments({ agentId: agent._id });
    res.status(200).json({ status: true, agent, propertyCount });
  } catch (error) {
    console.error("Error getting agent details:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Logout agent
export const LogoutAgent = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out agent:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
