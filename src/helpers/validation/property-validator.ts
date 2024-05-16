import Joi from "joi";
import { IProperty } from "../../models/property";

// Define validation schema for property data
const propertySchema = Joi.object({
  agent_id: Joi.string().required(),
  price: Joi.string().required(),
 // image_urls: Joi.array().items(Joi.string().uri()).optional(),
  is_deleted: Joi.boolean().default(false),
  created_at: Joi.date().default(Date.now),
  category: Joi.string().required(),
  available_for: Joi.string().required(),
  listing_id: Joi.string().required(),
  property_description: Joi.string().required(),
  property_images: Joi.array().items(Joi.string().uri()).optional(),
  general_details: Joi.object({
    Price: Joi.string().required(),
    Taxes: Joi.string().required(),
    Address: Joi.string().required(),
    "Lot Size": Joi.string().required(),
    "Directions/Cross Streets": Joi.string().required(),
  }).required(),
  room_interior: Joi.object({
    Rooms: Joi.number().required(),
    Rooms_plus: Joi.number().required(),
    Bedrooms: Joi.number().required(),
    Bedrooms_plus: Joi.number().required(),
    Kitchens: Joi.number().required(),
    "Family Room": Joi.string().required(),
    Basement: Joi.string().required(),
  }).required(),
  exterior: Joi.object({
    "Property Type": Joi.string().required(),
    Style: Joi.string().required(),
    Exterior: Joi.string().required(),
    "Garage Type": Joi.string().required(),
    Drive_Parking_Spaces: Joi.number().required(),
    Pool: Joi.string().required(),
  }).required(),
  utilities: Joi.object({
    "Fireplace/Stove": Joi.string().required(),
    "Heat Source": Joi.string().required(),
    "Heat Type": Joi.string().required(),
    "Central Air Conditioning": Joi.string().required(),
    "Laundry Level": Joi.string().required(),
    Sewers: Joi.string().required(),
    Water: Joi.string().required(),
  }).required(),
  at_a_glance: Joi.object({
    Type: Joi.string().required(),
    Area: Joi.string().required(),
    Municipality: Joi.string().required(),
    Neighbourhood: Joi.string().required(),
    Style: Joi.string().required(),
    "Lot Size": Joi.string().required(),
    Tax: Joi.string().required(),
    Beds: Joi.number().required(),
    Baths: Joi.number().required(),
    Fireplace: Joi.string().required(),
    Pool: Joi.string().required(),
  }).required(),
  street_view: Joi.string().required(),
  map_location: Joi.string().required(),
});

export function validateProperty(reqBody: IProperty) {
  return propertySchema.validate(reqBody);
}

export function validateUpdateProperty(reqBody: Partial<IProperty>) {
  return propertySchema.validate(reqBody);
}
