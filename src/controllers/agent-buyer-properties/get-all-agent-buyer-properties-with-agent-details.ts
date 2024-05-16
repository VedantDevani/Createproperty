import { Request, Response } from "express";
import {
  isAgentExistsById,
  isBuyerExistsById,
} from "../../helpers/validation/auth-validator";
import agentBuyerPropertyModel from "../../models/agent-buyer-property";
import { Types } from "mongoose";

const getAllAgentBuyerPropertiesWithAgentDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { buyer_id, page, page_size } = req.query;

    if (!buyer_id) {
      res.status(400).json({
        status: false,
        message: "buyer_id is required",
      });
      return;
    }

    if (
      buyer_id &&
      typeof buyer_id === "string" &&
      !(await isBuyerExistsById(buyer_id))
    ) {
      res.status(400).send({ status: false, message: "Invalid Buyer ID." });
      return;
    }

    const pageNum = parseInt(page as string) || 1;
    const size = parseInt(page_size as string) || 10;

    const skip = (pageNum - 1) * size;

    const agentBuyerProperties = await agentBuyerPropertyModel.aggregate([
      {
        $match: {
          buyer_id: new Types.ObjectId(buyer_id as string),
        },
      },
      {
        $sort: { created_at: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: size,
      },
      {
        $lookup: {
          from: "properties",
          localField: "property_id",
          foreignField: "_id",
          as: "property",
        },
      },
      {
        $lookup: {
          from: "agents",
          localField: "agent_id",
          foreignField: "_id",
          as: "agent",
        },
      },
      {
        $unwind: "$property",
      },
      {
        $unwind: "$agent",
      },
      {
        $match: { "property.is_deleted": false },
      },
      {
        $project: {
          property: 1,
          agent: 1,
        },
      },
    ]);

    const filteredProperties = agentBuyerProperties.filter(
      (property) => property.property_id !== null
    );

    res.status(200).json({ statuss: true, data: filteredProperties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default getAllAgentBuyerPropertiesWithAgentDetails;
