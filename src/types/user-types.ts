import { Types } from "mongoose";

export interface IUser extends Document {
  agent_id: Types.ObjectId;
  buyer_id: Types.ObjectId;
  email: string;
  password_hash: string;
  verification_token: string;
  is_verified: boolean;
  social_provider: string;
  social_id: string;
  created_at: Date;
}
