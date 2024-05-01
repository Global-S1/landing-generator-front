'use server';

import { getUserServerSession } from "@/auth/actions/getUserSession";
import { redirect } from "next/navigation";
import { deleteImage, uploadImage, uploadImageFromUrl } from "./cloudinaryActions";
import prisma from "@/lib/prisma";
import { About, Features, Hero } from "../interfaces";

type Content = Hero | About

interface UpdateImage {
    sectionId: string;
    content: Content;
    formData?: FormData;
    imgUrl?: string;
}

export const updateHeroImg = async ({ sectionId, content, formData, imgUrl }: UpdateImage) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    };

    let urlImage;
    if (formData) {
        urlImage = await uploadImage(formData);
    }
    if (imgUrl) {
        urlImage = await uploadImageFromUrl(imgUrl);
    }
    await deleteImage(content.img.src);

    const updateResponse = prisma.hero.update({
        where: { id: sectionId },
        data: {
            img: { src: urlImage, alt: content.img.alt }
        }
    });

    return updateResponse;
}

export const updateAboutImg = async ({ sectionId, content, formData, imgUrl }: UpdateImage) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    };

    let urlImage;
    if (formData) {
        urlImage = await uploadImage(formData);
    }
    if (imgUrl) {
        urlImage = await uploadImageFromUrl(imgUrl);
    }
    await deleteImage(content.img.src);

    const updateResponse = prisma.about.update({
        where: { id: sectionId },
        data: {
            img: { src: urlImage, alt: content.img.alt }
        }
    });

    return updateResponse;
}

interface UpdateImageFeatureItem {
    sectionId: string;
    content: Features;
    formData?: FormData;
    imgUrl?: string;
}

export const updateFeatureItemImg = async (title: string, { sectionId, content, formData, imgUrl }: UpdateImageFeatureItem) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    };

    const { features } = content;

    const indexFeature: number | undefined = content.features.findIndex(el => el.title.trim() === title.trim())

    let urlImage = '';
    if (formData) {
        urlImage = await uploadImage(formData);
    }
    if (imgUrl) {
        urlImage = await uploadImageFromUrl(imgUrl);
    }

    await deleteImage(features[indexFeature].img.src);

    features[indexFeature].img.src = urlImage;

    const updateResponse = prisma.features.update({
        where: { id: sectionId },
        data: {
            features: features as object
        }
    });

    return updateResponse;
}