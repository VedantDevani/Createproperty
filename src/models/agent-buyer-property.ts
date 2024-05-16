import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAgentBuyerProperty extends Document {
  agent_id: Types.ObjectId;
  buyer_id: Types.ObjectId;
  property_id: Types.ObjectId;
  created_at: Date;
}

const AgentBuyerPropertySchema: Schema = new Schema({
  agent_id: { type: Types.ObjectId, ref: "Agent", required: true },
  buyer_id: { type: Types.ObjectId, ref: "Buyer", required: true },
  property_id: { type: Types.ObjectId, ref: "Property", required: true },
  created_at: { type: Date, default: Date.now },
});

const AgentBuyerProperty = mongoose.model<IAgentBuyerProperty>(
  "AgentBuyerProperty",
  AgentBuyerPropertySchema
);

export default AgentBuyerProperty;
