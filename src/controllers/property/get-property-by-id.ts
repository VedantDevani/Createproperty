import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import mongoose from "mongoose";

export const getPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ObjectId' });
  }

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export default getPropertyById;
