import { Request, Response } from "express";
import PropertyModel, { IProperty } from "../../models/property";
import { FilterQuery } from "mongoose";
import { validateAgentRegistration } from "../../helpers/validation/agent-validation";
import { isValidObjectId } from "../../helpers/common";

const getProperties = async (req: Request, res: Response) => {
  try {
    const { agentId, page, page_size } = req.query;

    let query: FilterQuery<IProperty> = { isDeleted: false };

    // If agentId is provided and valid, add it to the query
    if (agentId && typeof agentId === "string") {
      if (!isValidObjectId(agentId) || !(await validateAgentRegistration(agentId))) {
        return res.status(400).json({
          status: false,
          message: "Invalid Agent ID or Agent not found with given ID",
        });
      }
      query.agentId = agentId;
    }

    const pageNum = parseInt(page as string) || 1;
    const size = parseInt(page_size as string) || 10;
    const skip = (pageNum - 1) * size;

    console.log("Query:", query); // Log the constructed query

    // Fetch the total count of properties matching the query
    const totalCount = await PropertyModel.countDocuments(query);

    // Fetch the properties for the current page
    const properties: IProperty[] = await PropertyModel.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(size);

    console.log("Properties:", properties); // Log the fetched properties

    return res.status(200).json({
      status: true,
      data: properties,
      totalCount,
    });
  } catch (error) {
    console.error("Error getting properties:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export default getProperties;
