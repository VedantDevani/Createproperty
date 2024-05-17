import { Request, Response } from "express";
import PropertyModel, { IProperty } from "../../models/property";
import { FilterQuery } from "mongoose";
import {
  isAgentExistsById,
  isBuyerExistsById,
} from "../../helpers/validation/auth-validator";
import { isValidObjectId } from "../../helpers/common";

const getProperties = async (req: Request, res: Response) => {
  try {
    const { agentId, buyer_id, page, page_size } = req.query;

    if (
      agentId &&
      typeof agentId === "string" &&
      (!isValidObjectId(agentId) || !(await isAgentExistsById(agentId)))
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid Agent ID or Agent not found with given ID",
      });
    }

    if (
      buyer_id &&
      typeof buyer_id === "string" &&
      (!isValidObjectId(buyer_id) || !(await isBuyerExistsById(buyer_id)))
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid Buyer ID or Buyer not found with given ID",
      });
    }

    let query: FilterQuery<IProperty> = { isDeleted: false };

    if (agentId && buyer_id) {
      query = {
        agentId: agentId as string,
        buyer_id: buyer_id as string,
        isDeleted: false,
      };
    } else {
      if (agentId) {
        query.agentId = agentId as string;
      }

      if (buyer_id) {
        query.buyer_id = buyer_id as string;
      }
    }

    const pageNum = parseInt(page as string) || 1;
    const size = parseInt(page_size as string) || 10;

    const skip = (pageNum - 1) * size;

    // Fetch properties with populated nested details
    const properties: IProperty[] = await PropertyModel.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(size)
      .select("-propertyImages -streetView -mapLocation") // Exclude large fields or unnecessary fields
      .populate("agentId") // Populate agent details if needed
      .exec();

    // Format the response to include nested details under specific sections
    const formattedProperties = properties.map((property) => ({
      _id: property._id,
      agentId: property.agentId,
      price: property.price,
      isDeleted: property.isDeleted,
      createdAt: property.createdAt,
      category: property.category,
      availableFor: property.availableFor,
      listingId: property.listingId,
      propertyDescription: property.propertyDescription,
      generalDetails: {
        price: property.generalDetails.price,
        taxes: property.generalDetails.taxes,
        address: property.generalDetails.address,
        lotSize: property.generalDetails.lotSize,
        directionsCrossStreets: property.generalDetails.directionsCrossStreets,
      },
      roomInterior: {
        rooms: property.roomInterior.rooms,
        roomsPlus: property.roomInterior.roomsPlus,
        bedrooms: property.roomInterior.bedrooms,
        bedroomsPlus: property.roomInterior.bedroomsPlus,
        kitchens: property.roomInterior.kitchens,
        familyRoom: property.roomInterior.familyRoom,
        basement: property.roomInterior.basement,
      },
      exterior: {
        propertyType: property.exterior.propertyType,
        style: property.exterior.style,
        exterior: property.exterior.exterior,
        garageType: property.exterior.garageType,
        driveParkingSpaces: property.exterior.driveParkingSpaces,
        pool: property.exterior.pool,
      },
      utilities: {
        fireplaceStove: property.utilities.fireplaceStove,
        heatSource: property.utilities.heatSource,
        heatType: property.utilities.heatType,
        centralAirConditioning: property.utilities.centralAirConditioning,
        laundryLevel: property.utilities.laundryLevel,
        sewers: property.utilities.sewers,
        water: property.utilities.water,
      },
      atAGlance: {
        type: property.atAGlance.type,
        area: property.atAGlance.area,
        municipality: property.atAGlance.municipality,
        neighbourhood: property.atAGlance.neighbourhood,
        style: property.atAGlance.style,
        lotSize: property.atAGlance.lotSize,
        tax: property.atAGlance.tax,
        beds: property.atAGlance.beds,
        baths: property.atAGlance.baths,
        fireplace: property.atAGlance.fireplace,
        pool: property.atAGlance.pool,
      },
      __v: property.__v,
    }));

    console.log("Properties:", formattedProperties); // Log the formatted properties

    return res.status(200).json({ status: true, data: formattedProperties });
  } catch (error) {
    console.error("Error getting properties:", error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export default getProperties;
