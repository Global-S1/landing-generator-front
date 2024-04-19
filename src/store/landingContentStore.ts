import { landingContent } from "@/landing/data";
import { AboutSectionProps, CtaSectionProps, HeroSectionProps, LandingContent } from "@/landing/interfaces";
import { create } from "zustand";

interface ChangeHeroContent extends Partial<HeroSectionProps> { }
interface ChangeAboutContent extends Partial<AboutSectionProps> { }
interface ChangeCtaContent extends Partial<CtaSectionProps> { }

interface State {
    landing: LandingContent;
    changeHeroContent: (value: ChangeHeroContent) => void;
    changeAboutContent: (value: ChangeAboutContent) => void;
    changeCtaContent: (value: ChangeCtaContent) => void;
}

export const useLandingContentStore = create<State>((set) => ({
    landing: landingContent,

    changeHeroContent: (value: ChangeHeroContent) => set(state => ({
        landing: {
            ...state.landing,
            hero: {
                ...state.landing.hero,
                ...value
            }
        }
    })),
    changeAboutContent: (value: ChangeAboutContent) => set(state => ({
        landing: {
            ...state.landing,
            about: {
                ...state.landing.about,
                ...value
            }
        }
    })),
    changeCtaContent: (value: ChangeCtaContent) => set(state => ({
        landing: {
            ...state.landing,
            cta: {
                ...state.landing.cta,
                ...value
            }
        }
    }))
}))

