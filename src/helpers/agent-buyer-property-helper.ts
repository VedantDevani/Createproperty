import mongoose, { Types } from "mongoose";
import jwt from "jsonwebtoken";

export function decodeJwt(authHeader: string) {
  try {
    const token = extractToken(authHeader);
    const decoded = jwt.verify(token!, process.env.JWT_SECRET_KEY!);
    if (typeof decoded !== "string" && decoded.userId) {
      return { userId: decoded.userId };
    } else {
      throw new Error("Invalid token format");
    }
  } catch (err: any) {
    console.error("Error decoding JWT token:", err.message);
    return null;
  }
}

export function extractToken(authorizationHeader: string) {
  if (!authorizationHeader) {
    return null;
  }

  const parts = authorizationHeader.split(" ");

  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  } else {
    return null;
  }
}

export async function getBuyersExcludedFromProperty(
  id: string | Types.ObjectId,
  excludedBuyerIds: string[] | Types.ObjectId[]
) {
  try {
    const { ObjectId } = mongoose.Types;

    const cursor = mongoose.connection.collection("users").aggregate([
      { $match: { referred_by: new ObjectId(id) } },
      {
        $lookup: {
          from: "buyers",
          localField: "buyer_id",
          foreignField: "_id",
          as: "buyer",
        },
      },
      { $unwind: "$buyer" },
      {
        $match: {
          "buyer._id": { $nin: excludedBuyerIds },
        },
      },
      {
        $project: {
          _id: "$buyer._id",
          user_id: "$buyer.user_id",
          first_name: "$buyer.first_name",
          last_name: "$buyer.last_name",
          email: "$buyer.email",
          mobile: "$buyer.mobile",
          __v: "$buyer.__v",
        },
      },
    ]);
    return await cursor.toArray();
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}
