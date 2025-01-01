import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinaryConfig from "./CloudinaryConfig.js"

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinaryConfig,
    params: {
        folder: 'uploads', // Replace with your desired folder name in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg'], // Allow only specific file formats
    },
});

const upload = multer({ storage ,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
