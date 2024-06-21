import Joi from 'joi';

export const validateAgentRegistration = (data: any) => {
  const schema = Joi.object({
    agentId: Joi.string().required(),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(6).required(),
    licenseNumber: Joi.string().required(),
    agencyName: Joi.string().required(),
    agencyAddress: Joi.string().required(),
    yearsOfExperience: Joi.number().integer().min(0).required(),
    specializations: Joi.array().items(Joi.string()).min(1).required(),
    profilePicture: Joi.string(),
    governmentID: Joi.string(),
    linkedInProfile: Joi.string(),
    website: Joi.string(),
    marketingPreferences: Joi.boolean().required(),
    preferredCommunicationChannels: Joi.array().items(Joi.string()).min(1).required(),
    languagesSpoken: Joi.array().items(Joi.string()).min(1).required(),
    serviceAreas: Joi.array().items(Joi.string()).min(1).required(),
    professionalBio: Joi.string().required(),
    certificationsAwards: Joi.array().items(Joi.string()).min(1).required(),
    references: Joi.array().items(Joi.string()).min(1).required(),
  });

  return schema.validate(data);
};
