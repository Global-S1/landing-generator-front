import { CLOUDINARY_FOLDER, cloudinary } from "@/config";
import { UploadApiResponse } from "cloudinary";

export const uploadImage = async (formData: FormData) => {

    const file = formData.get('file') as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                { folder: CLOUDINARY_FOLDER }, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(result);

                }).end(buffer)
    })
    const urlImage = cloudinaryResponse!.secure_url;

    return urlImage
}

export const uploadImageFromUrl = async (imgUrl: string) => {

    const cloudinaryResponse: UploadApiResponse | undefined = await cloudinary.uploader.upload(imgUrl, {
        folder: CLOUDINARY_FOLDER
    })
    const urlImage = cloudinaryResponse!.secure_url;

    return urlImage
}

export const deleteImage = async (oldUrl: string) => {
    //* Eliminar imagen de cloudinary
    const nameArr = oldUrl.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    if (nameArr.includes(CLOUDINARY_FOLDER)) {
        await cloudinary.uploader.destroy(`${CLOUDINARY_FOLDER}/${public_id}`);
    }

}