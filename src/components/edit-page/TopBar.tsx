'use client'

import { useRouter } from "next/navigation";
import { Logo } from "../ui"
import { BtnExport } from "./BtnExport"
import { useLandingStore } from "@/store";
import { updateLandingContent } from "@/landing/actions";
import { LandingContent } from "@/landing/interfaces";

export const TopBar = () => {

    const router = useRouter();
    const {
        id: landingId,
        landing,
        serverLanding,

        setLandingContent,
        resetLandingStore,
        setServerLanding
    } = useLandingStore(state => state);

    const update = JSON.stringify(landing) == JSON.stringify(serverLanding)
    const background = update ? 'bg-green-600' : 'bg-blue-600'
    const updateText = update ? 'Actualizado' : 'Guardar cambios'

    async function updateContent() {
        if (update) return;

        updateLandingContent(landingId, landing)
            .then(updatedLanding => {
                setLandingContent(landingId, updatedLanding.content as unknown as LandingContent);
                setServerLanding(updatedLanding.content as unknown as LandingContent)
            })
    }

    const handleGoBack = () => {
        resetLandingStore();
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

