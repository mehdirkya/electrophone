// utils/storage.js
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'electrophone',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

export default storage;
