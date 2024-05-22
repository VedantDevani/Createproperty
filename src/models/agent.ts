import mongoose, { Schema, Document } from "mongoose";

export interface AgentModel extends Document {
  // id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  licenseNumber: string;
  agencyName: string;
  agencyAddress: string;
  yearsOfExperience: number;
  specializations: string[];
  profilePicture?: string;
  governmentID?: string;
  linkedInProfile?: string;
  website?: string;
  marketingPreferences: boolean;
  preferredCommunicationChannels: string[];
  languagesSpoken: string[];
  serviceAreas: string[];
  professionalBio: string;
  certificationsAwards: string[];
  references: string[];
  createdAt: Date;
}

const AgentSchema: Schema = new Schema({
 //  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  agencyName: { type: String, required: true },
  agencyAddress: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  specializations: { type: [String], required: true },
  profilePicture: { type: String },
  governmentID: { type: String },
  linkedInProfile: { type: String },
  website: { type: String },
  marketingPreferences: { type: Boolean, required: true },
  preferredCommunicationChannels: { type: [String], required: true },
  languagesSpoken: { type: [String], required: true },
  serviceAreas: { type: [String], required: true },
  professionalBio: { type: String, required: true },
  certificationsAwards: { type: [String], required: true },
  references: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<AgentModel>("Agent", AgentSchema);
