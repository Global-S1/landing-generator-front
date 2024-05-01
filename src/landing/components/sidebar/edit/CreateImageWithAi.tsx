'use client';

import { useState } from "react";
import { SiCodemagic } from "react-icons/si";
import { createImageWithAi } from '@/landing/actions';
import { useForm } from "@/hooks";
import { Modal } from "@mui/material";

interface Props {
    defaultPrompt: string;
    onSaveData: (imgUrl: string) => Promise<void>;
}

export const CreateImageWithAi = ({ defaultPrompt, onSaveData }: Props) => {

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageAi, setImageAi] = useState('');

    const { formState, onTextAreaChange } = useForm({
        description: defaultPrompt
    })

    async function createImgAi() {
        const prompt = formState.description;
        setIsLoading(true);

        await createImageWithAi(prompt)
            .then(url => {
                if (url) {

                    setImageAi(url)
                    setIsLoading(false)
                }
            });
    }

    async function saveImage() {
        setIsLoading(true)

        await onSaveData(imageAi)
            .then(() => {
                setIsLoading(false)
                setShowModal(false)
                setImageAi('')
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
            <Modal
                open={showModal}
                onClose={() => setShowModal(!showModal)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-4 rounded-md bg-white w-[700px] h-[250px]">
                    <div className="grid grid-cols-[2fr_1fr] gap-4 h-full">

                        <div className="flex flex-col justify-between">
                            <textarea
                                className="input border-2 border-gray-600 p-2 resize-none"
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
                                        ? <button onClick={createImgAi} className="btn" disabled={isLoading}>Enviar</button>
                                        : <button className="btn" onClick={saveImage} disabled={isLoading}>Guardar</button>
                                }
                                <button
                                    disabled={isLoading}
                                    className="btn"
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>

                        <div className=" bg-slate-400 rounded-md">
                            <img src={imageAi} className="object-cover h-full w-ful" />
                        </div>
                    </div>

                </div>

            </Modal>


        </>
    )
}
