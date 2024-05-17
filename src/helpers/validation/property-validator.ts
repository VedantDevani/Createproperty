import Joi from 'joi';


// Define validation schema for property data
const propertySchema = Joi.object({
  agent_id: Joi.number().required(),
  price: Joi.string().required(),
  is_deleted: Joi.boolean().default(false),
  created_at: Joi.date().default(() => new Date()),
  category: Joi.string().required(),
  available_for: Joi.string().required(),
  listing_id: Joi.string().required(),
  property_description: Joi.string().required(),
  property_images: Joi.array().items(Joi.string().uri()).optional(),
  general_details: Joi.object({
    price: Joi.string().required(),
    taxes: Joi.string().required(),
    address: Joi.string().required(),
    lot_size: Joi.string().required(),
    directions_cross_streets: Joi.string().required(),
  }).required(),
  room_interior: Joi.object({
    rooms: Joi.number().required(),
    rooms_plus: Joi.number().required(),
    bedrooms: Joi.number().required(),
    bedrooms_plus: Joi.number().required(),
    kitchens: Joi.number().required(),
    family_room: Joi.string().required(),
    basement: Joi.string().required(),
  }).required(),
  exterior: Joi.object({
    property_type: Joi.string().required(),
    style: Joi.string().required(),
    exterior: Joi.string().required(),
    garage_type: Joi.string().required(),
    drive_parking_spaces: Joi.number().required(),
    pool: Joi.string().required(),
  }).required(),
  utilities: Joi.object({
    fireplace_stove: Joi.string().required(),
    heat_source: Joi.string().required(),
    heat_type: Joi.string().required(),
    central_air_conditioning: Joi.string().required(),
    laundry_level: Joi.string().required(),
    sewers: Joi.string().required(),
    water: Joi.string().required(),
  }).required(),
  at_a_glance: Joi.object({
    type: Joi.string().required(),
    area: Joi.string().required(),
    municipality: Joi.string().required(),
    neighbourhood: Joi.string().required(),
    style: Joi.string().required(),
    lot_size: Joi.string().required(),
    tax: Joi.string().required(),
    beds: Joi.number().required(),
    baths: Joi.number().required(),
    fireplace: Joi.string().required(),
    pool: Joi.string().required(),
  }).required(),
  street_view: Joi.string().required(),
  map_location: Joi.string().required(),
});

export function validateProperty(reqBody: PropertyDocument) {
  return propertySchema.validate(reqBody);
}

export function validateUpdateProperty(reqBody: Partial<PropertyDocument>) {
  return propertySchema.validate(reqBody, { allowUnknown: true, stripUnknown: true });
}
