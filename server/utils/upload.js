// utils/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; // your cloudinary config file

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "electrophone", // folder in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
