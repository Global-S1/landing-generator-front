'use client';

import { useLandingContentStore, useUiStore } from "@/store";
import { AboutSection } from "./sections/About"
import { CtaSection } from "./sections/Cta"
import { FaqSection } from "./sections/Faq"
import { FeaturesSection } from "./sections/Features"
import { Footer } from "./sections/Footer"
import { Header } from "./sections/Header"
import { HeroSection } from "./sections/Hero"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Landing = () => {

    const landing = useLandingContentStore(state => state.landing)
    const sectionSelected = useUiStore(state => state.sectionSelected);

    const { hero, about, features, faq, cta, footer } = landing;
const router = useRouter()

    useEffect(() => {
        if(sectionSelected){
            router.push('#'+sectionSelected)
        }
    }, [sectionSelected])
    

    return (
        <div id="app">
            <Header logo="Gym Street" />
            <HeroSection {...hero} />
            <AboutSection {...about} />
            <FeaturesSection {...features} />
            <FaqSection {...faq} />
            <CtaSection {...cta} />
            <Footer />
        </div>
    )
}
