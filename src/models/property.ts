import mongoose, { Schema, Document } from "mongoose";

// Define interfaces for nested objects
interface GeneralDetails {
  Price: string;
  Taxes: string;
  Address: string;
  "Lot Size": string;
  "Directions/Cross Streets": string;
}

interface RoomInterior {
  Rooms: number;
  Rooms_plus: number;
  Bedrooms: number;
  Bedrooms_plus: number;
  Kitchens: number;
  "Family Room": string;
  Basement: string;
}

interface Exterior {
  "Property Type": string;
  Style: string;
  Exterior: string;
  "Garage Type": string;
  Drive_Parking_Spaces: number;
  Pool: string;
}

interface Utilities {
  "Fireplace/Stove": string;
  "Heat Source": string;
  "Heat Type": string;
  "Central Air Conditioning": string;
  "Laundry Level": string;
  Sewers: string;
  Water: string;
}

interface AtAGlance {
  Type: string;
  Area: string;
  Municipality: string;
  Neighbourhood: string;
  Style: string;
  "Lot Size": string;
  Tax: string;
  Beds: number;
  Baths: number;
  Fireplace: string;
  Pool: string;
}

export interface IProperty extends Document {
  agent_id: string; 
  price:string;
 // image_urls: string[];
  is_deleted: boolean;
  created_at: Date;
  category: string;
  available_for: string;
  listing_id: string;
  property_description: string;
  property_images: string[];
  general_details: GeneralDetails;
  room_interior: RoomInterior;
  exterior: Exterior;
  utilities: Utilities;
  at_a_glance: AtAGlance;
  street_view: string;
  map_location: string;
}

const GeneralDetailsSchema: Schema = new Schema({
  Price: { type: String, required: true },
  Taxes: { type: String, required: true },
  Address: { type: String, required: true },
  "Lot Size": { type: String, required: true },
  "Directions/Cross Streets": { type: String, required: true },
});

const RoomInteriorSchema: Schema = new Schema({
  Rooms: { type: Number, required: true },
  Rooms_plus: { type: Number, required: true },
  Bedrooms: { type: Number, required: true },
  Bedrooms_plus: { type: Number, required: true },
  Kitchens: { type: Number, required: true },
  "Family Room": { type: String, required: true },
  Basement: { type: String, required: true },
});

const ExteriorSchema: Schema = new Schema({
  "Property Type": { type: String, required: true },
  Style: { type: String, required: true },
  Exterior: { type: String, required: true },
  "Garage Type": { type: String, required: true },
  Drive_Parking_Spaces: { type: Number, required: true },
  Pool: { type: String, required: true },
});

const UtilitiesSchema: Schema = new Schema({
  "Fireplace/Stove": { type: String, required: true },
  "Heat Source": { type: String, required: true },
  "Heat Type": { type: String, required: true },
  "Central Air Conditioning": { type: String, required: true },
  "Laundry Level": { type: String, required: true },
  Sewers: { type: String, required: true },
  Water: { type: String, required: true },
});

const AtAGlanceSchema: Schema = new Schema({
  Type: { type: String, required: true },
  Area: { type: String, required: true },
  Municipality: { type: String, required: true },
  Neighbourhood: { type: String, required: true },
  Style: { type: String, required: true },
  "Lot Size": { type: String, required: true },
  Tax: { type: String, required: true },
  Beds: { type: Number, required: true },
  Baths: { type: Number, required: true },
  Fireplace: { type: String, required: true },
  Pool: { type: String, required: true },
});

const PropertySchema: Schema = new Schema({
  agent_id: { type: String, required: true }, 
  price: { type: String, required: true }, 
 // image_urls: { type: [String], default: [] },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  category: { type: String, required: true },
  available_for: { type: String, required: true },
  listing_id: { type: String, required: true },
  property_description: { type: String, required: true },
  property_images: { type: [String], required: true },
  general_details: { type: GeneralDetailsSchema, required: true },
  room_interior: { type: RoomInteriorSchema, required: true },
  exterior: { type: ExteriorSchema, required: true },
  utilities: { type: UtilitiesSchema, required: true },
  at_a_glance: { type: AtAGlanceSchema, required: true },
  street_view: { type: String, required: true },
  map_location: { type: String, required: true },
});

const Property = mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
