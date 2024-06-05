import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import { propertyValidationSchema } from "../../helpers/validation/property-validator";
import path from "path";
import fs from "fs";

const updateProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
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
  
      const { error } = propertyValidationSchema.validate(req.body, { abortEarly: false });
      if (error) {
        res.status(400).json({
          status: false,
          message: error.details.map((detail) => detail.message).join(', ')
        });
        return;
      }
  
      const files = req.files as Express.Multer.File[];
      const imageUrls: string[] = files?.map((file: Express.Multer.File) => file.filename) || [];
  
      const updateData: Partial<IProperty> = {
        ...req.body,
        propertyImages: imageUrls.length ? imageUrls : existingProperty.propertyImages, 
      };
  
      if (imageUrls.length) {
        existingProperty.propertyImages.forEach((imageUrl) => {
          const imagePath = path.join(__dirname, "../../../images", imageUrl);
          fs.unlink(imagePath, (err) => {
            if (err) console.log(err);
            else console.log(`Deleted file: ${imagePath}`);
          });
        });
      }
  
      existingProperty.set(updateData);
  
      const updatedProperty: IProperty = await existingProperty.save();
  
    const propertiesDirPath = path.join(__dirname, "../../data");
    const propertiesFilePath = path.join(propertiesDirPath, "properties.json");

    if (!fs.existsSync(propertiesDirPath)) {
      fs.mkdirSync(propertiesDirPath, { recursive: true });
    }

    let properties: IProperty[] = [];
    if (fs.existsSync(propertiesFilePath)) {
      const data = fs.readFileSync(propertiesFilePath, "utf8");
      properties = JSON.parse(data);
    }

    const propertyIndex = properties.findIndex(property => property?._id?.toString() === id);
    if (propertyIndex !== -1) {
      properties[propertyIndex] = updatedProperty.toObject();
    } else {
      properties.push(updatedProperty.toObject());
    }

    fs.writeFileSync(propertiesFilePath, JSON.stringify(properties, null, 2), "utf8");

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
