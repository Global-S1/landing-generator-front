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

// export const updateLandingContent = async (landingId: string, content: LandingContent) => {
//     const user = await getUserServerSession();
//     if (!user) {
//         redirect('/api/auth/signin')
//     }

//     const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });
//     if (!landingExist) {
//         throw 'Landing do not exist';
//     }

//     const upadatedLanding = await prisma.landing.update({
//         where: { id: landingId, userId: user.id },
//         data: {
//             content: content as object
//         },
//     })

//     return upadatedLanding;
// }

// export const updateSectionsLayout = async (landingId: string, sectionsLayout: SectionsLayout) => {
//     const user = await getUserServerSession();
//     if (!user) {
//         redirect('/api/auth/signin')
//     }

//     const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });
//     if (!landingExist) {
//         throw 'Landing do not exist';
//     }

//     const upadatedLanding = await prisma.landing.update({
//         where: { id: landingId, userId: user.id },
//         data: {
//             sectionsLayout: sectionsLayout as object
//         }
//     })

//     return upadatedLanding;
// }


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


// export const updateSectionImg = async (landingId: string, sectionId: string,sectionType: SectionType, formData: FormData) => {
//     const user = await getUserServerSession();
//     if (!user) {
//         redirect('/api/auth/signin');
//     };

//     const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });

//     switch (sectionType) {
//         case 'hero':

//             const section = prisma.hero.findUnique({where:{id: sectionId}});
//             const updateSection = prisma.hero.update({where:{id: sectionId,}, data:{
//                 img:{src: 'https://placehold.co/600x400'}
//             }})

//             break;

//         default:
//             break;
//     }

//     if (!landingExist) {
//         throw 'Landing do not exist';
//     }

//     const file = formData.get('file') as File;

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     //* Subir imagen a cloudinary
//     const cloudinaryResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//             .upload_stream(
//                 { folder: CLOUDINARY_FOLDER }, (err, result) => {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                     }
//                     resolve(result);

//                 }).end(buffer)
//     })
//     const urlImage = cloudinaryResponse!.secure_url;

//     //* Eliminar imagen de cloudinary
//     const oldUrl = content.hero.img.src;
//     const nameArr = oldUrl.split("/");
//     const name = nameArr[nameArr.length - 1];
//     const [public_id] = name.split(".");
//     if (nameArr.includes(CLOUDINARY_FOLDER)) {
//         await cloudinary.uploader.destroy(`${CLOUDINARY_FOLDER}/${public_id}`);
//     }

//     if (section === 'hero') {
//         content.hero.img.src = urlImage;
//     }

//     const upadatedLanding = await prisma.landing.update({
//         where: { id: landingId, userId: user.id },
//         data: {
//             content: content as object
//         },
//     })

//     // revalidatePath('/edit-page/' + landingId)
//     return upadatedLanding;
// }
export const updateSectionImg = async (landingId: string, sectionId: string, sectionType: SectionType, formData: FormData) => {
    const user = await getUserServerSession();
    if (!user) {
        redirect('/api/auth/signin');
    };

    const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });


    const updateSection = prisma.hero.update({
        where: { id: sectionId, }, data: {
            img: { src: 'https://placehold.co/600x400' }
        }
    })

    return updateSection;
}
// export const saveImageAi = async (landingId: string, section: SectionType, content: LandingContent, imageData: string) => {
//     const user = await getUserServerSession();
//     if (!user) {
//         redirect('/api/auth/signin');
//     };

//     const landingExist = await prisma.landing.findUnique({ where: { id: landingId, userId: user.id } });

//     if (!landingExist) {
//         throw 'Landing do not exist';
//     }

//     const cloudinaryResponse = await cloudinary.uploader.upload(imageData, {
//         folder: CLOUDINARY_FOLDER
//     })
//     const urlImage = cloudinaryResponse.secure_url;

//     //* Eliminar imagen de cloudinary
//     const oldUrl = content.hero.img.src;
//     const nameArr = oldUrl.split("/");
//     const name = nameArr[nameArr.length - 1];
//     const [public_id] = name.split(".");
//     if (nameArr.includes(CLOUDINARY_FOLDER)) {
//         await cloudinary.uploader.destroy(`${CLOUDINARY_FOLDER}/${public_id}`);
//     }

//     if (section === 'hero') {
//         content.hero.img.src = urlImage;
//     }

//     const upadatedLanding = await prisma.landing.update({
//         where: { id: landingId, userId: user.id },
//         data: {
//             content: content as object
//         },
//     })

//     // revalidatePath('/edit-page/' + landingId)
//     return upadatedLanding;
// }

