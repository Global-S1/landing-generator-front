import { useState } from "react";
import { SiCodemagic } from "react-icons/si";
import { createImageWithAi, saveImageAi } from "@/landing/actions";
import { useForm } from "@/hooks";
import { useLandingStore } from "@/store";
import { LandingContent } from "@/landing/interfaces";

interface Props {
    defaultPrompt: string
}

export const CreateImageWithAi = ({ defaultPrompt }: Props) => {

    const {
        id: landingId,
        landing,

        setServerLanding,
        setLandingContent,
    } = useLandingStore(state => state);

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageAi, setImageAi] = useState('');

    const { formState, onTextAreaChange } = useForm({
        description: defaultPrompt
    })

    async function createImgAi() {
        const prompt = formState.description;

        await createImageWithAi(prompt)
            .then(url => {
                if (url) {
                    setImageAi(url)
                }
            });
    }

    async function saveImage() {
        await saveImageAi(landingId, 'hero', landing, imageAi)
            .then(updatedLanding => {

                setLandingContent(landingId, updatedLanding.content as unknown as LandingContent);
                setServerLanding(updatedLanding.content as unknown as LandingContent);
            })
    }

    return (
        <>
            <button
                type="button"
                className="flex fle-row gap-4 p-2 rounded-md justify-center items-center font-bold border-[1px] border-purple-500 text-purple-500"
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                onClick={() => setShowModal(!showModal)}
            >
                Crear imagen con AI
                <SiCodemagic />
            </button>
            {
                showModal && (
                    <section className="w-full grid grid-cols-2 gap-2">
                        <div>
                            <textarea
                                className="input resize-none"
                                cols={30}
                                rows={4}
                                spellCheck={false}
                                placeholder="Hero title"
                                value={formState.description}
                                name="description"
                                onChange={onTextAreaChange} />
                            <div className="flex flex-row  justify-between">
                                {
                                    !imageAi
                                        ? <button onClick={createImgAi}>Enviar</button>
                                        : <button className="bg-blue-500" onClick={saveImage}>Guardar</button>
                                }
                                <button>Cancelar</button>

                            </div>

                        </div>
                        <div className=" bg-slate-400">
                            <img src={imageAi} />
                        </div>
                    </section>
                )


            }
        </>
    )
}
