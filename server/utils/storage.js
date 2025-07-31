// utils/storage.js
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ElectroPhone_Products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export default storage;
