import { createImageWithAi } from "@/landing/actions";
import { SiCodemagic } from "react-icons/si"

export const EditImage = () => {

    async function createImgAi() {
        const prompt = 'Crea un imagen de un gatito siames';

        createImageWithAi(prompt);
    }


  return (
    <button
                className="flex fle-row gap-4 p-2 rounded-md justify-center items-center font-bold border-[1px] border-purple-500 text-purple-500"
                onClick={createImgAi}
            >
                Crear imagen con AI
                <SiCodemagic />
            </button>
  )
}
