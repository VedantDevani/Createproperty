import mongoose, { Schema, Document } from "mongoose";

interface GeneralDetails {
  price: string;
  taxes: string;
  address: string;
  lotSize: string;
  directionsCrossStreets: string;
}

interface RoomInterior {
  rooms: number;
  roomsPlus: number;
  bedrooms: number;
  bedroomsPlus: number;
  kitchens: number;
  familyRoom: string;
  basement: string;
}

interface Exterior {
  propertyType: string;
  style: string;
  exterior: string;
  garageType: string;
  driveParkingSpaces: number;
  pool: string;
}

interface Utilities {
  fireplaceStove: string;
  heatSource: string;
  heatType: string;
  centralAirConditioning: string;
  laundryLevel: string;
  sewers: string;
  water: string;
}

interface AtAGlance {
  type: string;
  area: string;
  municipality: string;
  neighbourhood: string;
  style: string;
  lotSize: string;
  tax: string;
  beds: number;
  baths: number;
  fireplace: string;
  pool: string;
}

export interface IProperty extends Document {
  agentId: mongoose.Types.ObjectId;
  price: string;
  isDeleted: boolean;
  createdAt: Date;
  category: string;
  availableFor: string;
  listingId: string;
  propertyDescription: string;
  propertyImages: string[];
  generalDetails: GeneralDetails;
  roomInterior: RoomInterior;
  exterior: Exterior;
  utilities: Utilities;
  atAGlance: AtAGlance;
  streetView: string;
  mapLocation: string;
}

const PropertySchema: Schema = new Schema({
  agentId: { type: mongoose.Types.ObjectId, ref: "Agent", required: true },
  price: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  availableFor: { type: String, required: true },
  listingId: { type: String, required: true },
  propertyDescription: { type: String, required: true },
  propertyImages: { type: [String], required: true },
  generalDetails: {
    price: { type: String, required: true },
    taxes: { type: String, required: true },
    address: { type: String, required: true },
    lotSize: { type: String, required: true },
    directionsCrossStreets: { type: String, required: true },
  },
  roomInterior: {
    rooms: { type: Number, required: true },
    roomsPlus: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bedroomsPlus: { type: Number, required: true },
    kitchens: { type: Number, required: true },
    familyRoom: { type: String, required: true },
    basement: { type: String, required: true },
  },
  exterior: {
    propertyType: { type: String, required: true },
    style: { type: String, required: true },
    exterior: { type: String, required: true },
    garageType: { type: String, required: true },
    driveParkingSpaces: { type: Number, required: true },
    pool: { type: String, required: true },
  },
  utilities: {
    fireplaceStove: { type: String, required: true },
    heatSource: { type: String, required: true },
    heatType: { type: String, required: true },
    centralAirConditioning: { type: String, required: true },
    laundryLevel: { type: String, required: true },
    sewers: { type: String, required: true },
    water: { type: String, required: true },
  },
  atAGlance: {
    type: { type: String, required: true },
    area: { type: String, required: true },
    municipality: { type: String, required: true },
    neighbourhood: { type: String, required: true },
    style: { type: String, required: true },
    lotSize: { type: String, required: true },
    tax: { type: String, required: true },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    fireplace: { type: String, required: true },
    pool: { type: String, required: true },
  },
  streetView: { type: String, required: true },
  mapLocation: { type: String, required: true },
});

const Property = mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
