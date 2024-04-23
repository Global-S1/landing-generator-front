'use server';
import OpenAI from 'openai';

export const createImageWithAi = async (prompt: string) => {

    const api_key = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey: api_key });

    const resp = await openai.images.generate({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: "url"
    })

    console.log(resp.data)
    const imageData = resp.data[0].url;


    return imageData
}
