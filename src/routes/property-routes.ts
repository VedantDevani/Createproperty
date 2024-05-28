import express from "express";
import createProperty from "../controllers/property/create-property";
import getProperties from "../controllers/property/get-properties";
import { handleUploadAndValidation } from "../config/multer-config";
 import updateProperty from "../controllers/property/update-property";
import softDeleteProperty from "../controllers/property/delete-property";
import getPropertyById from "../controllers/property/get-property-by-id";
import getPropertyAndSave from "../controllers/property/getPropertiesAndSave";

import getAllPropertiesAndSave from "../controllers/property/getAllPropertiesAndSave";

const router = express.Router();
router.get("/save-all", getAllPropertiesAndSave); 
router.get("/:id/save", getPropertyAndSave); 
router.get("/:id", getPropertyById); 
router.put("/:id", handleUploadAndValidation, updateProperty); 
router.delete("/:agentId/:id", softDeleteProperty); 
router.get("/", getProperties); 
router.post("/",handleUploadAndValidation, createProperty);

export default router;
