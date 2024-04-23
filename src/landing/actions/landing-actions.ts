'use server';

import { getUserServerSession } from "@/auth/actions/getUserSession";
import prisma from "@/lib/prisma";
import { LandingContent } from "../interfaces";
import { redirect } from "next/navigation";
import { SectionType, SectionsLayout } from "@/interfaces";
import { CLOUDINARY_FOLDER, cloudinary } from "@/config";
import { UploadApiResponse } from "cloudinary";

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

    const sectionsLayout = {
        hero: { id: '1' },
        about: { id: '1', status: true },
        features: { id: '1', status: true },
        faq: { id: '1', status: true },
        cta: { id: '1', status: true },
        footer: { id: '1', status: true },
    }

    const landing = await prisma.landing.create({
        data: {
            initialp_prompt: data.initialp_prompt,
            title: data.title,
            content: data.content as any,
            sectionsLayout,
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
        throw 'Landing do not exist';
    }

    const upadatedLanding = await prisma.landing.update({
        where: { id: landingId, userId: user.id },
        data: {
            content: content as object
        },
    })

    return upadatedLanding;
}

export const updateSectionsLayout = async (landingId: string, sectionsLayout: SectionsLayout) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin')
    }

    const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });
    if (!landingExist) {
        throw 'Landing do not exist';
    }

    const upadatedLanding = await prisma.landing.update({
        where: { id: landingId, userId: user.id },
        data: {
            sectionsLayout: sectionsLayout as object
        }
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



export const upadateSectionImg = async (landingId: string, section: SectionType, content: LandingContent, formData: FormData) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    };

    const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });

    if (!landingExist) {
        throw 'Landing do not exist';
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
export const saveImageAi = async (landingId: string, section: SectionType, content: LandingContent, imageData: string) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    };

    const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });

    if (!landingExist) {
        throw 'Landing do not exist';
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(imageData, {
        folder: CLOUDINARY_FOLDER
    })
    const urlImage = cloudinaryResponse.secure_url;

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

