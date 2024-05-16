import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";

const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const property: IProperty | null = await Property.findById(id);

    if (!property) {
      res.status(404).json({ status: false, message: "Property not found" });
      return;
    }

    res.status(200).json({ status: true, data: property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default getPropertyById;
