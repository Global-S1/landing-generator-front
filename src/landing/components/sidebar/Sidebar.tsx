'use client';

import { useState } from "react";
import { useLandingStore } from "@/store/landingStore";
import { RxSection } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";

import { SectionList } from "./view/SectionList";
import { ConfigView } from "./view/ConfigView";

export const Sidebar = () => {
    const { sectionsId: sections } = useLandingStore(state => state);
    const [view, setView] = useState('sections') // sections - config

    return (
        <aside className={`w-[400px] mt-[50px] h-[93vh] border-e-[1px] border-gray-600 bg-gray-50 p-2 overflow-y-scroll fixed`}>
            <div className="flex justify-between">
                <button
                    className=" w-full p-2 flex gap-4 justify-center items-center hover:bg-gray-200 rounded-sm"
                    onClick={() => setView('sections')}
                >
                    <RxSection size={20} />
                    Secciones
                </button>
                <button
                    className=" w-full p-2 flex gap-4 justify-center items-center hover:bg-gray-200 rounded-sm"
                    onClick={() => setView('config')}
                >
                    <IoSettingsOutline size={20} />
                    Configuración
                </button>
            </div>

            {view === 'sections' && <SectionList sections={sections} />}

            {view === 'config' && <ConfigView/>}

        </aside>
    )
}
