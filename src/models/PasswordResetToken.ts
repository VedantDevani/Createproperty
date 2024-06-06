import mongoose, { Document, Schema } from 'mongoose';

export interface IPasswordResetToken extends Document {
  email: string;
  tokenHash: string; 
  created_at: Date;
  used: boolean;
}

const passwordResetTokenSchema: Schema = new Schema({
  email: { type: String, required: true },
  tokenHash: { type: String, required: true },
  created_at: { type: Date, default: Date.now, expires: "1h" }, 
  used: { type: Boolean, default: false },
});

const PasswordResetToken = mongoose.model<IPasswordResetToken>('PasswordResetToken', passwordResetTokenSchema);
export default PasswordResetToken;
