import { Request, Response } from "express";
import {
  isAgentExistsById,
  isPropertyExistsById,
} from "../../helpers/validation/auth-validator";
import agentBuyerPropertyModel from "../../models/agent-buyer-property";
import {
  decodeJwt,
  getBuyersExcludedFromProperty,
} from "../../helpers/agent-buyer-property-helper";

const getAllBuyersExludedFromProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = decodeJwt(req.headers.authorization!);

    const { agent_id, property_id, page, page_size } = req.query;

    if (!agent_id || !property_id) {
      res.status(400).json({
        status: false,
        message: "Please provide both agent_id and property_id",
      });
      return;
    }

    if (
      agent_id &&
      typeof agent_id === "string" &&
      !(await isAgentExistsById(agent_id))
    ) {
      res.status(400).send({ status: false, message: "Invalid Agent ID." });
      return;
    }

    if (
      property_id &&
      typeof property_id === "string" &&
      !(await isPropertyExistsById(property_id))
    ) {
      res.status(400).send({ status: false, message: "Invalid Property ID." });
      return;
    }

    const pageNum = parseInt(page as string) || 1;
    const size = parseInt(page_size as string) || 10;

    const skip = (pageNum - 1) * size;

    const response = await agentBuyerPropertyModel
      .find({
        property_id,
        agent_id,
      })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(size)
      .select("buyer_id")
      .lean();

    const buyers = await getBuyersExcludedFromProperty(
      data?.userId,
      response.map((data) => data.buyer_id)
    );

    res.status(200).json({ status: true, data: buyers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default getAllBuyersExludedFromProperty;
