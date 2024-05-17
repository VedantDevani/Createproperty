import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import { propertyValidationSchema } from "../../helpers/validation/property-validator";

const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract image URLs from uploaded files
    const files = req.files as Express.Multer.File[];
    const imageUrls: string[] = files?.map((file: Express.Multer.File) => file.filename) || [];

    // Construct property data with image URLs
    const propertyData: Partial<IProperty> = {
      ...req.body,
      propertyImages: imageUrls,  // Ensure the field name matches the schema
      createdAt: new Date(), // Assuming createdAt is set to the current date
      isDeleted: false // Default value if not provided
    };

    // Validate property data
    const { error } = propertyValidationSchema.validate(propertyData, { abortEarly: false });
    if (error) {
      res.status(400).json({ status: false, message: error.details.map((detail) => detail.message).join(', ') });
      return;
    }

    // Create new Property document
    const newProperty: IProperty = new Property(propertyData);

    // Save the new property to the database
    const savedProperty: IProperty = await newProperty.save();

    // Respond with success message and created property
    res.status(201).json({
      status: true,
      message: "Property created successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default createProperty;
