import mongoose, { Schema, Document } from "mongoose";

export interface IAgent extends Document {
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
  googleId?: string;
  facebookId?: string;
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
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: false },
  licenseNumber: { type: String, required: false },
  agencyName: { type: String, required: false },
  agencyAddress: { type: String, required: false },
  yearsOfExperience: { type: Number, required: false },
  specializations: { type: [String], required: false },
  profilePicture: { type: String },
  governmentID: { type: String },
  linkedInProfile: { type: String },
  website: { type: String },
  googleId: { type: String },
  facebookId:{type: String},
  marketingPreferences: { type: Boolean, required: false },
  preferredCommunicationChannels: { type: [String], required: false },
  languagesSpoken: { type: [String], required: false },
  serviceAreas: { type: [String], required: false },
  professionalBio: { type: String, required: false },
  certificationsAwards: { type: [String], required: false },
  references: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAgent>("Agent", AgentSchema);
