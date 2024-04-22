import { v2} from 'cloudinary';

v2.config({
    cloud_name: 'dqwojznyw',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const CLOUDINARY_FOLDER = 'LANDING-AI';
export const cloudinary = v2;