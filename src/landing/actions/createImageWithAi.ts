'use server';
import { CLOUDINARY_FOLDER, cloudinary } from "@/config";
import axios from "axios"

export const createImageWithAi = async (prompt: string) => {
    const api_key = process.env.OPENAI_API_KEY;

    const body = {
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: 'b64_json'
    }

    const resp = await axios.post('https://api.openai.com/v1/images/generations',body,{
        headers:{
        'Authorization': `Bearer ${api_key}`,
        }
    })

    const openaiResponse = resp.data;
    const imageData = openaiResponse.data[0].b64_json;

    const cloudinaryResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageData}`, {
        folder: CLOUDINARY_FOLDER
    })

    const urlImage = cloudinaryResponse.secure_url;

    console.log(urlImage);

    return urlImage
}
