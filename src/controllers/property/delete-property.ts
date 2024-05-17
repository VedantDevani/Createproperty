import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";

const deleteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find the property by ID and delete it
    const deletedProperty: IProperty | null = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      res.status(404).json({
        status: false,
        message: "Property not found",
      });
      return;
    }

    // Respond with success message
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
