import Joi from "joi";
import { IAgentBuyerProperty } from "../../models/agent-buyer-property";

export function validateAgentBuyerProperty(reqBody: IAgentBuyerProperty) {
  const schema = Joi.object({
    agent_id: Joi.string().required(),
    buyer_id: Joi.string().required(),
    property_id: Joi.string().required(),
  });

  return schema.validate(reqBody);
}
