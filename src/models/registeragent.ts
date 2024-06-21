import mongoose, { Schema, Document } from 'mongoose';

export interface ISimpleAgent extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
}

const SimpleAgentSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, match: /^\d{10}$/ },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISimpleAgent>('SimpleAgent', SimpleAgentSchema);
