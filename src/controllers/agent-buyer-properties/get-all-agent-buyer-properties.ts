import { Request, Response } from "express";
import {
  isAgentExistsById,
  isBuyerExistsById,
} from "../../helpers/validation/auth-validator";
import agentBuyerPropertyModel from "../../models/agent-buyer-property";

const getAllAgentBuyerProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { agent_id, buyer_id, page, page_size } = req.query;

    if (!agent_id || !buyer_id) {
      res.status(400).json({
        status: false,
        message: "Please provide both agent_id and buyer_id",
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

    const agentBuyerProperties = await agentBuyerPropertyModel
      .find({
        buyer_id,
        agent_id,
      })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(size)
      .select("property_id")
      .populate({
        path: "property_id",
        match: { is_deleted: false },
      })
      .lean();

    const filteredProperties = agentBuyerProperties.filter(
      (property) => property.property_id !== null
    );

    res.status(200).json({ statuss: true, data: filteredProperties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default getAllAgentBuyerProperties;
