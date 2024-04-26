'use client';

import { useEffect } from "react";
import { useLandingStore, useUiStore } from "@/store";
import { useRouter } from "next/navigation";
import {
    AboutSection,
    CtaSection,
    FaqSection,
    FeaturesSection,
    FooterSection,
    HeaderSection,
    HeroSection
} from "./sections";

export const Landing = () => {
    const router = useRouter()

    const { header, hero, about, features, faq, cta, footer } = useLandingStore(state => state.sections)
    const sectionSelected = useUiStore(state => state.sectionSelected);


    useEffect(() => {
        if (sectionSelected) {
            router.push('#' + sectionSelected)
        }
    }, [sectionSelected])

    return (
        <div id="app" className="-z-10">
            <HeaderSection {...header} />

            <HeroSection {...hero} />
            {about.layout.status && <AboutSection {...about} />}

            {features.layout.status && <FeaturesSection {...features} />}

            {faq.layout.status && <FaqSection {...faq} />}

            {cta.layout.status && <CtaSection {...cta} />}

            <FooterSection {...footer} />
        </div>
    )
}
