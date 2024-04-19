'use client';

import { useLandingContentStore } from "@/store";
import { AboutSection } from "./sections/About"
import { CtaSection } from "./sections/Cta"
import { FaqSection } from "./sections/Faq"
import { FeaturesSection } from "./sections/Features"
import { Footer } from "./sections/Footer"
import { Header } from "./sections/Header"
import { HeroSection } from "./sections/Hero"

export const Landing = () => {

    const landing = useLandingContentStore(state => state.landing)

    const { hero, about, features, faq, cta, footer } = landing;

    return (
        <div className="app">
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
