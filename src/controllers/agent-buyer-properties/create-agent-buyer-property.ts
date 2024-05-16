import { Request, Response } from "express";
import {
  isAgentExistsById,
  isBuyerExistsById,
  isPropertyExistsById,
} from "../../helpers/validation/auth-validator";
import agentBuyerPropertyModel, {
  IAgentBuyerProperty,
} from "../../models/agent-buyer-property";
import { validateAgentBuyerProperty } from "../../helpers/validation/agent-buyer-property-validator";

const createAgentBuyerProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { agent_id, buyer_id, property_id }: IAgentBuyerProperty = req.body;

    const { error } = validateAgentBuyerProperty(req.body);

    if (error) {
      res
        .status(400)
        .json({ status: false, message: error.details[0].message });
      return;
    }

    if (!(await isAgentExistsById(agent_id))) {
      res.status(400).send({ status: false, message: "Invalid Agent ID." });
      return;
    }

    if (!(await isBuyerExistsById(buyer_id))) {
      res.status(400).send({ status: false, message: "Invalid Buyer ID." });
      return;
    }

    if (!(await isPropertyExistsById(property_id))) {
      res.status(400).send({ status: false, message: "Invalid Property ID." });
      return;
    }

    const existingAgentBuyerProperty: IAgentBuyerProperty | null =
      await agentBuyerPropertyModel.findOne({
        agent_id,
        buyer_id,
        property_id,
      });

    if (existingAgentBuyerProperty) {
      res.status(400).json({
        status: false,
        message: "Agent Buyer Property Already exists.",
      });
      return;
    }

    const newAgentBuyerProperty: IAgentBuyerProperty =
      new agentBuyerPropertyModel({
        agent_id,
        buyer_id,
        property_id,
      });

    const savedAgentBuyerProperty: IAgentBuyerProperty =
      await newAgentBuyerProperty.save();

    res.status(201).json({
      status: true,
      message: "Agent Buyer Property created successfully",
      agentBuyerProperty: savedAgentBuyerProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default createAgentBuyerProperty;
