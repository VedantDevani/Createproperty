import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import AgentModel from "../../models/agent";

export const updateAgentProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const agentId = req.params.id; 
  const {
    fullName,
    email,
    password,
    phoneNumber,
    licenseNumber,
    governmentID,
    website,
    profilePicture,
    agencyName,
    agencyAddress,
    yearsOfExperience,
    specializations,
    linkedInProfile,
    marketingPreferences,
    preferredCommunicationChannels,
    languagesSpoken,
    serviceAreas,
    professionalBio,
    certificationsAwards,
    references,
  } = req.body;

  try {
    const agent = await AgentModel.findById(agentId);
    if (!agent) {
      res.status(404).json({ status: false, message: "Agent not found" });
      return;
    }

    // Update registration fields
    agent.fullName = fullName || agent.fullName;
    agent.email = email || agent.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      agent.password = await bcrypt.hash(password, salt);
    }
    agent.phoneNumber = phoneNumber || agent.phoneNumber;
    agent.licenseNumber = licenseNumber || agent.licenseNumber;
    agent.governmentID = governmentID || agent.governmentID;
    agent.website = website || agent.website;
    agent.profilePicture = profilePicture || agent.profilePicture;

    // Update additional profile fields
    agent.agencyName = agencyName || agent.agencyName;
    agent.agencyAddress = agencyAddress || agent.agencyAddress;
    agent.yearsOfExperience = yearsOfExperience || agent.yearsOfExperience;
    agent.specializations = specializations || agent.specializations;
    agent.linkedInProfile = linkedInProfile || agent.linkedInProfile;
    agent.marketingPreferences =
      marketingPreferences || agent.marketingPreferences;
    agent.preferredCommunicationChannels =
      preferredCommunicationChannels || agent.preferredCommunicationChannels;
    agent.languagesSpoken = languagesSpoken || agent.languagesSpoken;
    agent.serviceAreas = serviceAreas || agent.serviceAreas;
    agent.professionalBio = professionalBio || agent.professionalBio;
    agent.certificationsAwards =
      certificationsAwards || agent.certificationsAwards;
    agent.references = references || agent.references;

    await agent.save();
    res
      .status(200)
      .json({ status: true, message: "Agent profile updated successfully" });
  } catch (error) {
    console.error("Error updating agent profile:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
