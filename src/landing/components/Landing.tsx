'use client';

import { useEffect } from "react";
import { useLandingStore, useUiStore } from "@/store";
import { AboutSection } from "./sections/About"
import { CtaSection } from "./sections/Cta"
import { FeaturesSection } from "./sections/Features"
import { Footer } from "./sections/Footer"
import { Header } from "./sections/Header"
import { useRouter } from "next/navigation";
import { HeroFullScreen } from "./sections/hero/HeroFullScreen";
import { FaqClassic } from "./sections/faq/FaqClassic";

export const Landing = () => {
    const router = useRouter()

    const {header,hero,about,features, faq,cta,footer} = useLandingStore(state => state)
    const sectionSelected = useUiStore(state => state.sectionSelected);

    
    useEffect(() => {
        if (sectionSelected) {
            router.push('#' + sectionSelected)
        }
    }, [sectionSelected])

    return (
        <div id="app" className="-z-10">
            <Header logo={header.title} />
            
            <HeroFullScreen {...hero} />
            <AboutSection {...about} />
            <FeaturesSection {...features} />
            <FaqClassic {...faq} />
            <CtaSection {...cta} />
            <Footer />
        </div>
    )
}
