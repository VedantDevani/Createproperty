import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";

const softDeleteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const updatedProperty: IProperty | null = await Property.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!updatedProperty) {
      res.status(404).json({
        status: false,
        message: "Property not found or already deleted",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default softDeleteProperty;
