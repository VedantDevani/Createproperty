import Joi from "joi";


const generalDetailsSchema = Joi.object({
  price: Joi.string().required(),
  taxes: Joi.string().required(),
  address: Joi.string().required(),
  lotSize: Joi.string().required(),
  directionsCrossStreets: Joi.string().required()
});

const roomInteriorSchema = Joi.object({
  rooms: Joi.number().required(),
  roomsPlus: Joi.number().required(),
  bedrooms: Joi.number().required(),
  bedroomsPlus: Joi.number().required(),
  kitchens: Joi.number().required(),
  familyRoom: Joi.string().required(),
  basement: Joi.string().required()
});

const exteriorSchema = Joi.object({
  propertyType: Joi.string().required(),
  style: Joi.string().required(),
  exterior: Joi.string().required(),
  garageType: Joi.string().required(),
  driveParkingSpaces: Joi.number().required(),
  pool: Joi.string().required()
});

const utilitiesSchema = Joi.object({
  fireplaceStove: Joi.string().required(),
  heatSource: Joi.string().required(),
  heatType: Joi.string().required(),
  centralAirConditioning: Joi.string().required(),
  laundryLevel: Joi.string().required(),
  sewers: Joi.string().required(),
  water: Joi.string().required()
});

const atAGlanceSchema = Joi.object({
  type: Joi.string().required(),
  area: Joi.string().required(),
  municipality: Joi.string().required(),
  neighbourhood: Joi.string().required(),
  style: Joi.string().required(),
  lotSize: Joi.string().required(),
  tax: Joi.string().required(),
  beds: Joi.number().required(),
  baths: Joi.number().required(),
  fireplace: Joi.string().required(),
  pool: Joi.string().required()
});

const propertyValidationSchema = Joi.object({
  agentId: Joi.string().required(),
  price: Joi.string().required(),
  isDeleted: Joi.boolean().default(false),
  createdAt: Joi.date().default(Date.now),
  category: Joi.string().required(),
  availableFor: Joi.string().required(),
  listingId: Joi.string().required(),
  propertyDescription: Joi.string().required(),
  propertyImages: Joi.array().items(Joi.string()).required(),
  generalDetails: generalDetailsSchema,
  roomInterior: roomInteriorSchema,
  exterior: exteriorSchema,
  utilities: utilitiesSchema,
  atAGlance: atAGlanceSchema,
  streetView: Joi.string().required(),
  mapLocation: Joi.string().required()
});

export { propertyValidationSchema };
