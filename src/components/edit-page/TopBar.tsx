'use client'

import { useRouter } from "next/navigation";
import { Logo } from "../ui"
import { BtnExport } from "./BtnExport"
import { useLandingStore } from "@/store";
import { landingContent } from "@/landing/data";
import { updateLandingContent } from "@/landing/actions";
import { LandingContent } from "@/landing/interfaces";

export const TopBar = () => {

    const router = useRouter();
    const setLandingContent = useLandingStore(state => state.setLandingContent);
    const setServerLanding = useLandingStore(state => state.setServerLanding);
    const landingId = useLandingStore(state => state.id);
    const landing = useLandingStore(state => state.landing);
    const serverLanding = useLandingStore(state => state.serverLanding);

    const background = JSON.stringify(landing) == JSON.stringify(serverLanding) ? 'bg-green-600' : 'bg-blue-600'

    const handleGoBack = () => {
        setLandingContent('', landingContent);
        router.push('/home')
    }

    async function updateContent() {

        const upadate = JSON.stringify(landing) == JSON.stringify(serverLanding)
        if (upadate) return;

        updateLandingContent(landingId, landing)
            .then(updatedLanding => {
                setLandingContent(landingId, updatedLanding.content as unknown as LandingContent);
                setServerLanding(updatedLanding.content as unknown as LandingContent)
            })
    }

    return (
        <header
            className="fixed z-50 flex flex-row items-center justify-between w-full h-[50px] border-b-[1px] border-gray-600 bg-gray-50 p-2">
            <Logo />

            <div className="flex flex-row gap-2">
                <button className={`py-2 px-4 rounded-md text-white ${background}`} onClick={updateContent}>Guadar</button>
                <button className="btn" onClick={handleGoBack}>home</button>
                <BtnExport />
            </div>
        </header>
    )
}
