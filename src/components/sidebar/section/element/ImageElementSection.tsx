'use client'

import { useForm } from "@/hooks";
import { useGeneratePageStore } from '@/store';
import { updateSectionContent } from '@/helpers/updateSectionContent';
import { IoSaveOutline } from 'react-icons/io5';
import { ElementProps } from "./Element";
import { BsStars } from "react-icons/bs";
import { gemerateImgWithAi } from "@/helpers/generateImgWithAI";
import { useState } from "react";

export const ImageElementSection = ({ element, sectionId }: ElementProps) => {

    const imgSrc = element.attributes.src ?? ''
    const imgAlt = element.attributes.alt ?? ''
    const [activeModal, setActiveModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { formState, onInputChange, onTextAreaChange } = useForm({
        src: imgSrc,
        alt: imgAlt,
        prompt_img: imgAlt
    });

    const setPageHtml = useGeneratePageStore(state => state.setPageHtml)
    const setSections = useGeneratePageStore(state => state.setSections)

    async function updateLandingContent() {
        updateSectionContent({
            sectionId,
            tagName: element.tagName,
            img: {
                oldValues: {
                    src: imgSrc,
                    alt: imgAlt
                },
                newValues: {
                    src: formState.src,
                    alt: formState.alt
                }
            }
        }
        ).then(data => {
            setPageHtml(data.template)
            setSections(data.sections)
        })
    }

    async function createNewImage() {
        setIsLoading(true)
        gemerateImgWithAi({
            prompt: formState.prompt_img,
            oldSrc: imgSrc,
            sectionId
        }).then(data => {
            setPageHtml(data.template)
            setSections(data.sections)
            setIsLoading(false)
        })
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className="flex justify-between items-center relative">
                <span className='uppercase font-bold'>{element.type}</span>
                <div className="flex gap-2">
                    <button
                        className='editElement__button--ai rounded--md'
                        onClick={() => setActiveModal(!activeModal)}
                        title="Generar imagen con AI"
                    >
                        <BsStars />
                    </button>
                    <button
                        className='editElement__button rounded--md'
                        title="Guardar cambios"
                        onClick={updateLandingContent}>
                        <IoSaveOutline />
                    </button>
                </div>
                {
                    activeModal && (
                        <div className="promptImgContainer flex flex-col gap-2">
                            <textarea
                                name="prompt_img"
                                value={formState.prompt_img}
                                onChange={onTextAreaChange}
                                id=""
                                cols={30}
                                rows={5}
                                spellCheck={false}
                                className="p-2 border-[1px] w-full border-gray-400 rounded-md resize-none"
                            ></textarea>
                            <button className="btn" onClick={createNewImage}>
                                {
                                    (!isLoading)
                                        ? <span>
                                            Enviar
                                        </span>
                                        :
                                        <div
                                            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                            role="status">
                                            <span
                                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >Loading...</span>
                                        </div>
                                }

                            </button>
                        </div>
                    )
                }
            </div>
            <hr />
            <div className='flex flex-row items-center gap-2'>
                <label>src</label>
                <input
                    className='p-2 border-[1px] w-full border-gray-500 rounded-md'
                    name="src"
                    type="text"
                    value={formState.src}
                    onChange={onInputChange}
                />
            </div>
            <div className='flex flex-row items-center gap-2'>
                <label>alt</label>
                <input
                    className='p-2 border-[1px] w-full border-gray-500 rounded-md'
                    name="alt"
                    type="text"
                    value={formState.alt}
                    onChange={onInputChange}
                />
            </div>

        </div>
    );
};
