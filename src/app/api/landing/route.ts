import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {

    const lagId = '662842fb06fc1a4bbde9ce0f'

    const landing = await prisma.sections.findFirst({
        where: { landingId: lagId },
        include: {
            landing: true,
            hero: true
        }
    });

    return NextResponse.json(landing)
}
export async function POST() {

    const landingId = '6628370a06fc1a4bbde9ce0e'

    const landing = await prisma.landing.create({
        data: {
            title: 'Sonic',
            initialp_prompt: 'computadoras facinantes',
            userId: '66242a9c118b4007bfa1a423',
        }
    })

    const hero = await prisma.hero.create({
        data: {
            title: 'Titulo hero',
            description: 'Description Hero',
            landingId: landing.id
        }
    })

    const sections = await prisma.sections.create({
        data: {
            heroId: hero.id,
            landingId: landing.id
        }
    })

    return NextResponse.json(sections)
}