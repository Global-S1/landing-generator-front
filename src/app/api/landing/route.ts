import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT() {
    const sectionsLayout = {
        hero: { id: '1' },
        about: { id: '1', status: true },
        features: { id: '1', status: true },
        faq: { id: '1', status: true },
        cta: { id: '1', status: true },
        footer: { id: '1', status: true },
    }

    await prisma.landing.updateMany({
        data: {
            sectionsLayout
        }
    })

    return NextResponse.json({
        msg: 'update all landings'
    })
}