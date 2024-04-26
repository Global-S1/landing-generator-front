'use server';

import prisma from "@/lib/prisma";
import { Layout } from "../interfaces";

export const updateSectionLayout = async (sectionId: string, option: string) => {

    const layout: Layout = {
        id: option,
        status: true
    }

    const updatedSection = await prisma.hero.update({
        where: { id: sectionId },
        data: {
            layout: layout as object,
        }
    })

    return updatedSection;
}