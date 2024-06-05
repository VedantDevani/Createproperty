import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import path from "path";
import fs from "fs";

const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const propertiesDirPath = path.join(__dirname, "../../data");
    const propertiesFilePath = path.join(propertiesDirPath, "properties.json");
    const { id, agentId } = req.params; 
    
    const property: IProperty | null = await Property.findById(id);

    if (!property) {
      res.status(404).json({
        status: false,
        message: "Property not found",
      });
      return;
    }

    if (property.agentId.toString() !== agentId) {
      res.status(403).json({
        status: false,
        message: "Unauthorized: Agent ID does not match property's agent ID",
      });
      return;
    }

    const deletedProperty: IProperty | null = await Property.findByIdAndDelete(
      id
    );

    if (!deletedProperty) {
      res.status(404).json({
        status: false,
        message: "Property not found",
      });
      return;
    }
    if (!fs.existsSync(propertiesDirPath)) {
      fs.mkdirSync(propertiesDirPath, { recursive: true });
    }

    let properties = [];
    if (fs.existsSync(propertiesFilePath)) {
      const data = fs.readFileSync(propertiesFilePath, 'utf8');
      properties = JSON.parse(data);
    }

    properties = properties.filter((property: IProperty) => property?._id?.toString() !== id);

    fs.writeFileSync(propertiesFilePath, JSON.stringify(properties, null, 2), 'utf8');

    res.status(200).json({
      status: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export default deleteProperty;
