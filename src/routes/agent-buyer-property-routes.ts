import express from "express";
import createAgentBuyerProperty from "../controllers/agent-buyer-properties/create-agent-buyer-property";
import getAllBuyersExludedFromProperty from "../controllers/agent-buyer-properties/get-all-buyers-excluded-from-property";
import getAllAgentBuyerProperties from "../controllers/agent-buyer-properties/get-all-agent-buyer-properties";
import getAllAgentBuyerPropertiesWithAgentDetails from "../controllers/agent-buyer-properties/get-all-agent-buyer-properties-with-agent-details";

const router = express.Router();

router.get("/", getAllAgentBuyerProperties);
router.post("/", createAgentBuyerProperty);
router.get("/agent-details", getAllAgentBuyerPropertiesWithAgentDetails);
router.get(
  "/get-all-buyers-excluded-from-property",
  getAllBuyersExludedFromProperty
);

export default router;
