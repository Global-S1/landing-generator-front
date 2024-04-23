'use client';

import { useLandingStore, useUiStore } from "@/store";
import { AboutSection } from "./sections/About"
import { CtaSection } from "./sections/Cta"
import { FeaturesSection } from "./sections/Features"
import { Footer } from "./sections/Footer"
import { Header } from "./sections/Header"
import { HeroSection } from "./sections/hero/Hero"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HeroClassic } from "./sections/hero/HeroClassic";
import { HeroFullScreen } from "./sections/hero/HeroFullScreen";
import { FaqClassic } from "./sections/faq/FaqClassic";

export const Landing = () => {
    const router = useRouter()

    const { landing, title, sectionsLayout } = useLandingStore(state => state);
    const sectionSelected = useUiStore(state => state.sectionSelected);

    const {
        hero: heroInfo,
        about: aboutInfo,
        features: featuresInfo,
        faq: faqInfo,
        cta: ctaInfo,
        footer: footerInfo
    } = landing;

    const { hero } = sectionsLayout;

    useEffect(() => {
        if (sectionSelected) {
            router.push('#' + sectionSelected)
        }
    }, [sectionSelected])

    return (
        <div id="app" className="-z-10">
            <Header logo={title} />
            {(hero.id === '1') && <HeroClassic {...heroInfo} />}
            {(hero.id === '2') && <HeroSection {...heroInfo} />}
            {(hero.id === '3') && <HeroFullScreen {...heroInfo} />}

            <AboutSection {...aboutInfo} />
            <FeaturesSection {...featuresInfo} />
            <FaqClassic {...faqInfo} />
            <CtaSection {...ctaInfo} />
            <Footer />
        </div>
    )
}
