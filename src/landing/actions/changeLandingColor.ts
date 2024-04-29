'use server';

import prisma from "@/lib/prisma"

export const changeLandingColor = async (landingId: string, color: string) => {

    const updatedLanding = await prisma.landing.update({
        where: {id: landingId},
        data:{
            color
        }
    })

    return updatedLanding;
}