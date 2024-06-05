import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Property from "../../models/property";

const propertiesDirPath = path.join(__dirname, "../../data");
const propertiesFilePath = path.join(propertiesDirPath, "properties.json");

const getPropertyBy_Id = async (req: Request, res: Response): Promise<void> => {
  const { id: propertyId } = req.params;

  try {
    if (!fs.existsSync(propertiesDirPath)) {
      fs.mkdirSync(propertiesDirPath, { recursive: true });
    }

    if (!fs.existsSync(propertiesFilePath)) {
      const properties = await Property.find().lean();

      fs.writeFileSync(
        propertiesFilePath,
        JSON.stringify(properties, null, 2),
        "utf8"
      );
    }

    const data = fs.readFileSync(propertiesFilePath, "utf8");
    const properties = JSON.parse(data);

    const property = properties.find(
      (prop: any) => prop._id.toString() === propertyId
    );

    if (!property) {
      res.status(404).json({ status: false, message: "Property not found" });
      return;
    }

    res.status(200).json({ status: true, property });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export default getPropertyBy_Id;
