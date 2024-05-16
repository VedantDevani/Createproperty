import mongoose from "mongoose";

export const isValidObjectId = (
  id: string | mongoose.Types.ObjectId
): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};
