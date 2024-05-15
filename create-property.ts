import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import { validateProperty } from "../../helpers/validation/property-validator";

const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract image URLs from uploaded files
    const files = req.files as Express.Multer.File[];
    const imageUrls: string[] = files?.map((file: Express.Multer.File) => file.filename) || [];

    // Construct property data with image URLs
    const propertyData: IProperty = {
      ...req.body,
      image_urls: imageUrls,
      created_at: new Date(), // Assuming created_at is set to current date
    };

    // Validate property data
    const { error } = validateProperty(propertyData);
    if (error) {
      res.status(400).json({ status: false, message: error.details[0].message });
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
