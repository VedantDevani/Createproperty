import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import { validateProperty } from "../../helpers/validation/property-validator";
import path from "node:path";
import fs from "node:fs";

const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingProperty: IProperty | null = await Property.findOne({
      _id: id,
      is_deleted: false,
    });

    if (!existingProperty) {
      res.status(404).json({
        status: false,
        message: "Property not found or already deleted",
      });
      return;
    }

    const { error } = validateProperty(req.body);
    if (error) {
      res
        .status(400)
        .json({ status: false, message: error.details[0].message });
      return;
    }

   const { property_images, ...updateData } = req.body;
   existingProperty.set(updateData);
   if (req.files?.length) {
     const files = req.files as Express.Multer.File[];
     const propertyImages: string[] = files.map(
       (file: Express.Multer.File) => file.filename
     );
     existingProperty.property_images.forEach((imageUrl) => {
       const imagePath = path.join(__dirname, "../../../images", imageUrl);
       fs.unlink(imagePath, (err) => {
         if (err) console.log(err);
         else {
           console.log(`\nDeleted file: ${imagePath}`);
         }
       });
     });
     existingProperty.property_images = propertyImages;
   }

    const updatedProperty: IProperty = await existingProperty.save();

    if (!updatedProperty) {
      res
        .status(500)
        .json({ status: false, message: "Failed to update property" });
      return;
    }

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
