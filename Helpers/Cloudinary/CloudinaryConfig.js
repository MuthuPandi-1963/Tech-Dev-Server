import cloudinary from 'cloudinary'
import  "dotenv/config";
// Configure Cloudinary with your credentials
const cloudinaryConfig  = cloudinary.v2
cloudinaryConfig.config({
    cloud_name: process.env.CLOUD_NAME, // Replace with your Cloudinary Cloud Name
    api_key: process.env.CLOUD_KEY,       // Replace with your Cloudinary API Key
    api_secret: process.env.CLOUD_SECRET, // Replace with your Cloudinary API Secret
});

export default cloudinaryConfig;
// console.log(cloudinaryConfig);
