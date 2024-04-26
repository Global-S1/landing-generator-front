'use client'

import { useRouter } from "next/navigation";
import { Logo } from "../ui"
import { BtnExport } from "./BtnExport"
import { useLandingStore } from "@/store";
import { updateSectionsContent } from "@/landing/actions";
import { About, Cta, Faq, Features, Footer, Header, Hero } from "@/landing/interfaces";

export const TopBar = () => {

    const {
        landing,
        sections,
        setState
    } = useLandingStore(state => state);

    const router = useRouter();

    const oldSectionsContent = localStorage.getItem('sectionsContent') ?? '{}';

    const update = JSON.stringify(sections) === oldSectionsContent;


    const background = update ? 'bg-green-600' : 'bg-blue-600'
    const updateText = update ? 'Actualizado' : 'Guardar cambios'
    async function updateContent() {


        if (!update) {
            updateSectionsContent(landing.id, sections)
                .then(resp => {
                    if (!resp) return;
                    const { header, hero, about, features, faq, cta, footer, landing } = resp;
                    setState({
                        landing,
                        sections: {
                            header: header as Header,
                            hero: hero as unknown as Hero,
                            about: about as unknown as About,
                            features: features as unknown as Features,
                            faq: faq as unknown as Faq,
                            cta: cta as unknown as Cta,
                            footer: footer as Footer,
                        }
                    })

                    localStorage.setItem('sectionsContent', JSON.stringify({ header, hero, about, features, faq, cta, footer }))
                })
        }
    }

    const handleGoBack = () => {

        router.push('/home')
    }
    return (
        <header
            className="fixed z-50 flex flex-row items-center justify-between w-full h-[50px] border-b-[1px] border-gray-600 bg-gray-50 p-2">
            <Logo />

            <div className="flex flex-row gap-2">
                <button className={`py-2 px-4 rounded-md text-white ${background}`} onClick={updateContent}>{updateText}</button>
                <button className="btn" onClick={handleGoBack}>home</button>
                <BtnExport />
            </div>
        </header>
    )
}

