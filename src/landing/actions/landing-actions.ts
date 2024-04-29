'use server';

import { getUserServerSession } from "@/auth/actions/getUserSession";
import prisma from "@/lib/prisma";
import { About, Cta, Faq, Features, Footer, Header, Hero, LandingContent } from "../interfaces";
import { redirect } from "next/navigation";
import { template } from "../data/template";
 
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
            color: '#9c27b0'
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

interface UpdateSections {
    header: Header;
    hero: Hero;
    about: About;
    features: Features;
    faq: Faq;
    cta: Cta;
    footer: Footer;
}

export const updateSectionsContent = async (landingId: string, sections: UpdateSections) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    }

    const { header, hero, about, features, faq, cta, footer } = sections;

    await Promise.all([
        prisma.header.update({
            where: { landingId, id: header.id },
            data: {
                title: header.title
            }
        }),
        prisma.hero.update({
            where: { landingId, id: hero.id },
            data: {
                title: hero.title,
                description: hero.description,
                img: hero.img as object,
                button: hero.button as object,
                layout: hero.layout as object
            }
        }),

        prisma.about.update({
            where: { landingId, id: about.id },
            data: {
                title: about.title,
                description: about.description,
                img: about.img as object,
                layout: about.layout as object
            }
        }),
        prisma.features.update({
            where: { landingId, id: features.id },
            data: {
                title: features.title,
                features: features.features as object[],
                layout: features.layout as object
            }
        }),
        prisma.faq.update({
            where: { landingId, id: faq.id },
            data: {
                title: faq.title,
                faqData: faq.faqData as object[],
                layout: faq.layout as object
            }
        }),
        prisma.cta.update({
            where: { landingId, id: cta.id },
            data: {
                title: cta.title,
                description: cta.description,
                button: cta.button as object,
                layout: cta.layout as object
            }
        }),
        prisma.footer.update({
            where: { landingId, id: footer.id },
            data: {
                title: footer.title
            }
        })
    ]);


    const updatedContent = await prisma.sections.findFirst({
        where: { landingId },
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

    return updatedContent;

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
    // const user = await getUserServerSession();
    // if (!user) {
    //     redirect('/api/auth/signin')
    // }
    // const landing = await prisma.sections.findFirst({
    //     where: { landingId: id },
    //     include: {
    //         header: true,
    //         hero: true,
    //         about: true,
    //         features: true,
    //         faq: true,
    //         cta: true,
    //         footer: true,
    //         landing: true
    //     }
    // });


    return template;
}

