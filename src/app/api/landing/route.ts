import { getUserServerSession } from "@/auth/actions/getUserSession";
import { landingContentExample } from "@/landing/data";
import { LandingContent, LandingResponse } from "@/landing/interfaces";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import OpenAI from 'openai';


export async function GET() {

    const lagId = '662913d0160785e12c5d17f1'

    const landing = await prisma.sections.findFirst({
        where: { landingId: lagId },
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

    return NextResponse.json(landing)
}


const api_key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: api_key });

export async function POST(req: Request) {

    const user = await getUserServerSession()

    if (!user) {
        return redirect('api/auth')
    }

    const { title, prompt } = req.body as unknown as { title: string; prompt: string };


    const SYSTEM_PROMPT = `Eres un experto en la creación de contenido para una landing page. El usuario te proporcionará un objeto que representa todo el contenido que tendrá la landing page y sus secciones, junto con una descripción de su negocio.
        El objeto contendrá todas las secciones de una landing page, con los atributos necesarios, pero los valores estarán vacíos. A través de la descripción del negocio proporcionada por el usuario, debes reemplazar todos estos valores vacíos por el contenido correspondiente en su respectiva sección.
        Utiliza la estructura exacta proporcionada por el usuario. Los primeros atributos son las secciones de una landing page, y solo deben incluirse esas secciones, sin agregar nuevas.
        Entrega el objeto con el contenido de la landing, sin generar texto adicional o explicaciones.
        Para las img.src puedes utilizar alguna de estas direcciones URL:
        https://res.cloudinary.com/dqwojznyw/image/upload/v1711978399/cld-sample-4.jpg
        https://res.cloudinary.com/dqwojznyw/image/upload/v1711978399/cld-sample-3.jpg
        https://res.cloudinary.com/dqwojznyw/image/upload/v1711978375/samples/food/spices.jpg
        https://res.cloudinary.com/dqwojznyw/image/upload/v1711978398/cld-sample-2.jpg
        https://res.cloudinary.com/dqwojznyw/image/upload/v1711978362/sample.jpg
        https://res.cloudinary.com/dqwojznyw/image/upload/v1711978371/samples/animals/three-dogs.jpg
        https://res.cloudinary.com/dqwojznyw/image/upload/v1711978365/samples/ecommerce/analog-classic.jpg
        
        Y para las img.alt incluye una descripcion detallada que de la image para que una IA de generación de imágenes pueda generar la imagen más tarde.
        NO incluyas markdown "\`\`\`" o "\`\`\`json" al principio o al final.`;

    const USER_PROMPT = `Crea el contenido de mi landing page en este objeto: ${JSON.stringify(landingContentExample)}. Esta es la description de mi negocio: ${prompt}`

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: 'user', content: USER_PROMPT }
        ],
        model: 'gpt-3.5-turbo-0125'
    })

    if (!completion) return completion

    const assistanResponse = completion.choices[0].message.content ?? '{}'

    const content: LandingContent = JSON.parse(assistanResponse);


    const landing = await prisma.landing.create({
        data: {
            title,
            initialp_prompt: prompt,
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

    return NextResponse.json(sections)
}