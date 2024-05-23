import { Request, Response } from "express";
import PropertyModel from "../../models/property";
import fs from "fs";
import path from "path";

const getPropertyAndSave = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;

    const property = await PropertyModel.findById(propertyId);
    if (!property || property.isDeleted) {
      return res
        .status(404)
        .json({ status: false, message: "Property not found" });
    }

    const filePath = path.join(__dirname, `../../data/property_${propertyId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(property, null, 2), "utf-8");

    return res.status(200).json({ status: true, message: `Property ${propertyId} saved to file` });
  } catch (error) {
    console.error("Error getting property:", error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};


export default getPropertyAndSave;
