import mongoose, { Schema, Document } from "mongoose";

export interface IAgent extends Document {
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
  id: string;
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
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: false, validate: /^\d{10}$/ },
  password: { type: String, required: false },
  licenseNumber: { type: String, default: "" },
  agencyName: { type: String, default: ""},
  agencyAddress: { type: String, default: "" },
  yearsOfExperience: { type: Number, default: 0},
  specializations: { type: [String], default: "" },
  profilePicture: { type: String },
  governmentID: { type: String,default: "" },
  linkedInProfile: { type: String,default: "" },
  website: { type: String,default: "" },
  googleId: { type: String },
  facebookId: { type: String },
  marketingPreferences: { type: Boolean, default: false},
  preferredCommunicationChannels: { type: [String], default: "" },
  languagesSpoken: { type: [String], default: "" },
  serviceAreas: { type: [String],default: "" },
  professionalBio: { type: String, default: "" },
  certificationsAwards: { type: [String], default: "" },
  references: { type: [String], default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAgent>("Agent", AgentSchema);
