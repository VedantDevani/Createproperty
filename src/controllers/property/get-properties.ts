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

    let query: FilterQuery<IProperty> = { isDeleted: true };

    if (agentId && buyer_id) {
      query = {
        agentId: agentId as string,
        buyer_id: buyer_id as string,
        isDeleted: true,
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

    console.log("Query:", query); // Log the constructed query

    const properties: IProperty[] = await PropertyModel.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(size);

    console.log("Properties:", properties); // Log the fetched properties

    return res.status(200).json({ status: true, data: properties });
  } catch (error) {
    console.error("Error getting properties:", error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export default getProperties;
