import { useState } from "react";
import { LandingGeneratorApi } from "@/api";
import { useForm } from "@/hooks";
import { APIResponse } from "@/interfaces";
import { useGeneratePageStore, useUiStore } from "@/store";
import { SiCodemagic } from "react-icons/si";

export const EditSectionWithAi = ({ sectionId }: { sectionId: string }) => {

    const [isLoading, setIsLoading] = useState(false)

    const template = useGeneratePageStore((state) => state.html);

    const setPageHtml = useGeneratePageStore((state) => state.setPageHtml);
    const setSections = useGeneratePageStore((state) => state.setSections);
    const toggleLoadingEditSection = useUiStore((state) => state.toggleLoadingEditSection);

    const { description, onTextAreaChange } = useForm({
        description: ""
    });

    async function sendInfoToEdit() {
        toggleLoadingEditSection()
        setIsLoading(true)
        try {
            const body = {
                prompt: description,
                section: sectionId,
                template
            };

            const resp = await LandingGeneratorApi.put<APIResponse>('/edit-section', body);
            const json = resp.data;

            setPageHtml(json.template);
            setSections(json.sections)
            toggleLoadingEditSection()
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            toggleLoadingEditSection()
            setIsLoading(false)
        }
    };

    return (
        <>
            <span className="flex gap-2 items-center font-bold text-xl  text-purple-500">
                <h4 >Prompt</h4>
                <SiCodemagic />
            </span>
            <textarea
                name="description"
                value={description}
                style={{ resize: 'none' }}
                onChange={onTextAreaChange}
                rows={5}
                spellCheck={false}
                className="input p-2"

            />
            <button type="button" disabled={isLoading} className="btn" onClick={sendInfoToEdit}>
                {
                    (!isLoading)
                        ? <span>
                            Realizar cambio
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
        </>
    )
}
