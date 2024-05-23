import { Request, Response } from "express";
import PropertyModel from "../../models/property";
import fs from "fs";
import path from "path";

const getAllPropertiesAndSave = async (req: Request, res: Response) => {
  try {
    const properties = await PropertyModel.find({ isDeleted: false });
    console.log(properties)

    const filePath = path.join(__dirname, "../../data/all_properties.json");
    fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), "utf-8");

    return res
      .status(200)
      .json({ status: true, message: "All properties saved to file" });
  } catch (error) {
    console.error("Error getting properties:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export default getAllPropertiesAndSave;
