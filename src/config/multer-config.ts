import { NextFunction, Request, Response } from "express";
import multer, { Multer, MulterError } from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: "images",
  filename: function (_: Request, file: Express.Multer.File, cb: Function) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `image_${uniqueSuffix}${ext}`);
  },
});

export const imageUpload: Multer = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(_: Request, file: Express.Multer.File, cb: Function) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      cb(true, undefined);
    }
    cb(undefined, true);
  },
});

export const uploadMiddleware = imageUpload.array("images", 4);

export const handleUploadAndValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadMiddleware(req, res, (err: any) => {
    if (err instanceof MulterError) {
      return res.status(400).json({ status: false, message: err.message });
    }

    if (err) {
      return res.status(400).json({
        status: false,
        message: "Please upload an image in PNG or JPG format",
      });
    }

    if (req.method === "POST") {
      if (req.files?.length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "No image uploaded" });
      }
    }

    next();
  });
};
