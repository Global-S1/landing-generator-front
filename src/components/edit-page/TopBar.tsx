'use client'

import { useRouter } from "next/navigation";
import { Logo } from "../ui"
import { BtnExport } from "./BtnExport"

export const TopBar = () => {

    const router = useRouter();
    
    const handleGoBack = () => {
        
        router.push('/home')
    }
    return (
        <header
            className="fixed z-50 flex flex-row items-center justify-between w-full h-[50px] border-b-[1px] border-gray-600 bg-gray-50 p-2">
            <Logo />

            <div className="flex flex-row gap-2">
                {/* <button className={`py-2 px-4 rounded-md text-white ${background}`} onClick={updateContent}>{updateText}</button> */}
                <button className="btn" onClick={handleGoBack}>home</button>
                <BtnExport />
            </div>
        </header>
    )
}

