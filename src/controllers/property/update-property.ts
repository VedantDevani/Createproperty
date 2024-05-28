import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import { propertyValidationSchema } from "../../helpers/validation/property-validator";
import path from "path";
import fs from "fs";

const updateProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      // Find the existing property by ID and ensure it's not deleted
      const existingProperty: IProperty | null = await Property.findOne({
        _id: id,
        isDeleted: false,
      });
  
      if (!existingProperty) {
        res.status(404).json({
          status: false,
          message: "Property not found or already deleted",
        });
        return;
      }
  
      // Validate the incoming request data
      const { error } = propertyValidationSchema.validate(req.body, { abortEarly: false });
      if (error) {
        res.status(400).json({
          status: false,
          message: error.details.map((detail) => detail.message).join(', ')
        });
        return;
      }
  
      // Extract image URLs from uploaded files
      const files = req.files as Express.Multer.File[];
      const imageUrls: string[] = files?.map((file: Express.Multer.File) => file.filename) || [];
  
      // Update existing property data
      const updateData: Partial<IProperty> = {
        ...req.body,
        propertyImages: imageUrls.length ? imageUrls : existingProperty.propertyImages, // Update images if new ones are uploaded
      };
  
      // If new images are uploaded, delete old images
      if (imageUrls.length) {
        existingProperty.propertyImages.forEach((imageUrl) => {
          const imagePath = path.join(__dirname, "../../../images", imageUrl);
          fs.unlink(imagePath, (err) => {
            if (err) console.log(err);
            else console.log(`Deleted file: ${imagePath}`);
          });
        });
      }
  
      // Update the existing property with new data
      existingProperty.set(updateData);
  
      // Save the updated property to the database
      const updatedProperty: IProperty = await existingProperty.save();
  
      res.status(200).json({
        status: true,
        message: "Property updated successfully",
        property: updatedProperty,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };
  
  export default updateProperty;
