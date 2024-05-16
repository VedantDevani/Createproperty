import mongoose, { Types } from "mongoose";

export async function getDataByCollectionName(
  collectionName: string,
  id: string | Types.ObjectId
) {
  try {
    const { ObjectId } = mongoose.Types;
    const doc = await mongoose.connection
      .collection(collectionName)
      .findOne({ _id: new ObjectId(id) });
    return doc !== null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}

export const isAgentExistsById = async (
  id: string | Types.ObjectId
): Promise<boolean> => {
  try {
    return await getDataByCollectionName("agents", id);
  } catch (error) {
    console.error("Error checking agent existence by id:", error);
    return false;
  }
};

export const isBuyerExistsById = async (
  id: string | Types.ObjectId
): Promise<boolean> => {
  try {
    return await getDataByCollectionName("buyers", id);
  } catch (error) {
    console.error("Error checking buyer existence by id:", error);
    return false;
  }
};

export const isPropertyExistsById = async (
  id: string | Types.ObjectId
): Promise<boolean> => {
  try {
    return await getDataByCollectionName("properties", id);
  } catch (error) {
    console.error("Error checking buyer existence by id:", error);
    return false;
  }
};
