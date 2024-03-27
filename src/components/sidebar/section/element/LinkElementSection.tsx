'use client'

import { useForm } from "@/hooks";
import { useGeneratePageStore } from '@/store';
import { IoSaveOutline } from 'react-icons/io5';
import { ElementProps } from "./Element";
import { updateSectionContent } from "@/helpers/updateSectionContent";

export const LinkElementSection = ({ element, sectionId }: ElementProps) => {

    const linkText = element.text
    const linkHref = element.attributes.href ?? ''

    const { formState, onInputChange } = useForm({
        text: linkText,
        href: linkHref
    });

    const html = useGeneratePageStore(state => state.html)
    const setPageHtml = useGeneratePageStore(state => state.setPageHtml)
    const setSections = useGeneratePageStore(state => state.setSections)


    async function updateLandingContent() {
        updateSectionContent({
            sectionId,
            tagName: element.tagName,
            link: {
                oldValues:{
                    text: linkText,
                    href: linkHref
                },
                newValues: {
                    text: formState.text,
                    href: formState.href
                }
            }
        }
        ).then(data => {
            setPageHtml(data.template)
            setSections(data.sections)
        })
    }


    return (
        <div className='flex flex-col gap-2'>
            <div className="flex justify-between items-center">
                <span className='uppercase font-bold'>{element.type}</span>
                <button
                    className='editElement__button rounded--md'
                    aria-label="uUdate"
                    onClick={updateLandingContent}>
                    <IoSaveOutline />
                </button>
            </div>
            <hr />
            <div className='flex flex-row items-center gap-2'>
                <input
                    className='p-2 border-[1px] w-full border-gray-500 rounded-md'
                    name="text"
                    type="text"
                    value={formState.text}
                    onChange={onInputChange}
                />
            </div>
            <div className='flex flex-row items-center gap-2'>
                <label>href</label>
                <input
                    className='p-2 border-[1px] w-full border-gray-500 rounded-md'
                    name="href"
                    type="text"
                    value={formState.href}
                    onChange={onInputChange}
                />
            </div>

        </div>
    );
};
