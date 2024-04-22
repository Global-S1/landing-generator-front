'use server';

import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

import { getUserServerSession } from "@/auth/actions/getUserSession";
import prisma from "@/lib/prisma";
import { LandingContent } from "../interfaces";
import { redirect } from "next/navigation";
import { SectionType } from "@/interfaces";

export interface CreateLandingDto {
    content: LandingContent;
    initialp_prompt: string;
    title: string
}

export const createLanding = async (data: CreateLandingDto) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin')
    };

    const landing = await prisma.landing.create({
        data: {
            initialp_prompt: data.initialp_prompt,
            title: data.title,
            content: data.content as any,
            userId: user.id
        }
    })

    return landing;
}
export const updateLandingContent = async (landingId: string, content: LandingContent) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin')
    }

    const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });
    if (!landingExist) {
        throw 'Landing do not exit';
    }

    const upadatedLanding = await prisma.landing.update({
        where: { id: landingId, userId: user.id },
        data: {
            content: content as object
        },
    })

    return upadatedLanding;
}


export const getLandings = async () => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin')
    }
    const landingList = await prisma.landing.findMany({ where: { userId: user.id } });

    return landingList;
}

export const getLanding = async (id: string) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin')
    }
    const landing = await prisma.landing.findUnique({ where: { userId: user.id, id, } });

    return landing;
}


cloudinary.config({
    cloud_name: 'dqwojznyw',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const CLOUDINARY_FOLDER = 'LANDING-AI';

export const upadateSectionImg = async (landingId: string, section: SectionType, content: LandingContent, formData: FormData) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    };

    const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });

    if (!landingExist) {
        throw 'Landing do not exit';
    }

    const file = formData.get('file') as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //* Subir imagen a cloudinary
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

    //* Eliminar imagen de cloudinary
    const oldUrl = content.hero.img.src;
    const nameArr = oldUrl.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    if (nameArr.includes(CLOUDINARY_FOLDER)) {
        await cloudinary.uploader.destroy(`${CLOUDINARY_FOLDER}/${public_id}`);
    }

    if (section === 'hero') {
        content.hero.img.src = urlImage;
    }

    const upadatedLanding = await prisma.landing.update({
        where: { id: landingId, userId: user.id },
        data: {
            content: content as object
        },
    })

    // revalidatePath('/edit-page/' + landingId)
    return upadatedLanding;
}

