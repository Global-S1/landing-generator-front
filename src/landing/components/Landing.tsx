'use client';

import { useEffect } from "react";
import { useLandingStore, useUiStore } from "@/store";
import { AboutSection } from "./sections/About"
import { CtaSection } from "./sections/Cta"
import { FeaturesSection } from "./sections/Features"
import { Footer } from "./sections/Footer"
import { Header } from "./sections/Header"
import { useRouter } from "next/navigation";
import { HeroSection } from "./sections/hero/HeroSection";
import { FaqSection } from "./sections/faq/FaqSection";

export const Landing = () => {
    const router = useRouter()

    const {header,hero,about,features, faq,cta,footer} = useLandingStore(state => state.sections)
    const sectionSelected = useUiStore(state => state.sectionSelected);

    
    useEffect(() => {
        if (sectionSelected) {
            router.push('#' + sectionSelected)
        }
    }, [sectionSelected])

    return (
        <div id="app" className="-z-10">
            <Header logo={header.title} />
            
            <HeroSection {...hero} />
            <AboutSection {...about} />
            <FeaturesSection {...features} />
            <FaqSection {...faq} />
            <CtaSection {...cta} />
            <Footer />
        </div>
    )
}
