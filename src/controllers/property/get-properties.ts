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
    const { agent_id, buyer_id, page, page_size } = req.query;

    if (
      agent_id &&
      typeof agent_id === "string" &&
      (!isValidObjectId(agent_id) || !(await isAgentExistsById(agent_id)))
    ) {
      res.status(400).json({
        status: false,
        message: "Invalid Agent ID or Agent not found with given ID",
      });
      return;
    }

    if (
      buyer_id &&
      typeof buyer_id === "string" &&
      (!isValidObjectId(buyer_id) || !(await isBuyerExistsById(buyer_id)))
    ) {
      res.status(400).json({
        status: false,
        message: "Invalid Buyer ID or Buyer not found with given ID",
      });
      return;
    }

    let query: FilterQuery<IProperty> = { is_deleted: false };

    if (agent_id && buyer_id) {
      query = {
        $and: [{ agent_id }, { buyer_id }],
      };
    } else {
      if (agent_id) {
        query.agent_id = agent_id;
      }

      if (buyer_id) {
        query.buyer_id = buyer_id;
      }
    }

    const pageNum = parseInt(page as string) || 1;
    const size = parseInt(page_size as string) || 10;

    const skip = (pageNum - 1) * size;

    const properties: IProperty[] = await PropertyModel.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(size);

    return res.status(200).json({ status: true, data: properties });
  } catch (error) {
    console.error("Error getting properties:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export default getProperties;
