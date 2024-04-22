'use server';

import OpenAI from 'openai';
import { landingContentExample } from './landingContenExample';
import { LandingContent } from '../interfaces';
import { CreateLandingDto, createLanding } from './landing-actions';

const api_key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: api_key });

export const createLandingContent = async (title: string, prompt: string) => {
    try {

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

        const landingContent = JSON.parse(assistanResponse);

        //* guardar en base de datos
        const landingData: CreateLandingDto = {
            initialp_prompt: prompt,
            title,
            content: landingContent
        }
        const landing = await createLanding(landingData)

        return landing;

    } catch (error) {
        console.log(error)
        return null
    }

}
