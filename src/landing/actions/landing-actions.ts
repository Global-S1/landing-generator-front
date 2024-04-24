'use server';

import { getUserServerSession } from "@/auth/actions/getUserSession";
import prisma from "@/lib/prisma";
import { LandingContent } from "../interfaces";
import { redirect } from "next/navigation";

export interface CreateLandingDto {
    content: LandingContent;
    initialp_prompt: string;
    title: string
}

export const createLanding = async (data: CreateLandingDto) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    };

    const { title, initialp_prompt, content } = data;

    const landing = await prisma.landing.create({
        data: {
            initialp_prompt,
            title,
            userId: user.id,
        }
    })

    const layout = { id: '1', status: true }

    const [header, hero, about, features, faq, cta, footer] = await Promise.all([
        prisma.header.create({
            data: {
                title,
                landingId: landing.id
            }
        }),
        prisma.hero.create({
            data: {
                ...content.hero,
                layout,
                landingId: landing.id
            }
        }),
        prisma.about.create({
            data: {
                ...content.about,
                layout,

                landingId: landing.id
            }
        }),
        prisma.features.create({
            data: {
                title: content.features.title,
                features: content.features.features as object[],
                layout,

                landingId: landing.id
            }
        }),
        prisma.faq.create({
            data: {
                title: content.faq.title,
                faqData: content.faq.faqData as object[],
                layout,

                landingId: landing.id
            }
        }),
        prisma.cta.create({
            data: {
                ...content.cta,
                layout,

                landingId: landing.id
            }
        }),
        prisma.footer.create({
            data: {
                title,
                landingId: landing.id
            }
        }),
    ])

    const sections = await prisma.sections.create({
        data: {
            headerId: header.id,
            heroId: hero.id,
            aboutId: about.id,
            featuresId: features.id,
            faqId: faq.id,
            ctaId: cta.id,
            footerId: footer.id,
            landingId: landing.id
        },
        include: {
            header: true,
            hero: true,
            about: true,
            features: true,
            faq: true,
            cta: true,
            footer: true,
            landing: true
        }
    })

    return sections;
}

export const getLandings = async () => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin')
    }
    const landingList = await prisma.landing.findMany({ where: { userId: user.id } });

    return landingList;
}

export const getLandingContent = async (id: string) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin')
    }
    const landing = await prisma.sections.findFirst({
        where: { landingId: id },
        include: {
            header: true,
            hero: true,
            about: true,
            features: true,
            faq: true,
            cta: true,
            footer: true,
            landing: true
        }
    });

    return landing;
}

