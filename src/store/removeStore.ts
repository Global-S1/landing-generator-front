import { create } from "zustand";
import { SectionType, SectionsLayout } from "@/interfaces";
import { landingContent, sectionsLayoutExample } from "@/landing/data";
import { AboutSectionProps, CtaSectionProps, FaqItem, Feature, HeroSectionProps, LandingContent } from "@/landing/interfaces";

interface ChangeHeroContent extends Partial<HeroSectionProps> { }
interface ChangeAboutContent extends Partial<AboutSectionProps> { }
interface ChangeCtaContent extends Partial<CtaSectionProps> { }
interface ChangeFeatureItemContent extends Partial<Feature> { }
interface ChangeFaqItemContent {
    question?: string;
    answer?: string;
}
interface LandingState {
    id: string;
    title: string;
    landing: LandingContent;
    serverLanding: LandingContent;
    sectionsLayout: SectionsLayout;

    // initail methods
    setTitle: (value: string) => void;
    setServerLanding: (content: LandingContent) => void;
    setLandingContent: (id: string, content: LandingContent) => void;
    setSectionsLayout: (value: SectionsLayout) => void;

    resetLandingStore:() => void;

    changeSectionLayout: (section: SectionType ,value: string) => void;

    changeHeroContent: (value: ChangeHeroContent) => void;
    changeAboutContent: (value: ChangeAboutContent) => void;
    changeCtaContent: (value: ChangeCtaContent) => void;

    // feature
    changeFeatureItemContent: (oldTitle: string, value: ChangeFeatureItemContent) => void;
    addNewFeature: (value: Feature) => void;
    deleteFeature: (value: string) => void;

    // faq
    changeFaqItemContent: (oldQuestion: string, value: ChangeFaqItemContent) => void;
    addNewFaqItem: (value: FaqItem) => void;
    deleteFaqItem: (value: string) => void;
}

export const useDesontinuadoLandingStore = create<LandingState>((set) => ({
    id: '',
    landing: landingContent,
    serverLanding: landingContent,
    title: '',
    sectionsLayout: sectionsLayoutExample,

    //* methods
    setTitle: (value: string) => set({
        title: value
    }),
    setServerLanding: (content: LandingContent) => set({
        serverLanding: content
    }),
    setSectionsLayout: (value: SectionsLayout) => set({
        sectionsLayout:{...value}
    }),
    resetLandingStore: () => set({
        id: '',
        landing: landingContent,
        serverLanding: landingContent,
    }),

    setLandingContent: (idValue: string, content: LandingContent) => set({
        id: idValue,

        landing: { ...content }
    }),
    
    changeSectionLayout: (section: SectionType ,value: string) => set(({sectionsLayout}) => ({
        sectionsLayout: {
            ...sectionsLayout,
            [section]: {
                ...sectionsLayout[section], 
                id: value
            }
        }
    })),

    //* sections content
    changeHeroContent: (value: ChangeHeroContent) => set(state => ({
        landing: {
            ...state.landing,
            hero: {
                ...state.landing.hero,
                ...value
            }
        }
    })),
    changeAboutContent: (value: ChangeAboutContent) => set(({ landing }) => ({
        landing: {
            ...landing,
            about: {
                ...landing.about,
                ...value
            }
        }
    })),
    changeCtaContent: (value: ChangeCtaContent) => set(({ landing }) => ({
        landing: {
            ...landing,
            cta: {
                ...landing.cta,
                ...value
            }
        }
    })),

    //* Feature
    changeFeatureItemContent: (oldTitle: string, value: ChangeFeatureItemContent) => set(({ landing }) => ({
        landing: {
            ...landing,
            features: {
                ...landing.features,
                features: landing.features.features.map(f => {
                    if (f.title.trim() === oldTitle.trim()) {
                        const updatedFeature = {
                            ...f,
                            ...value
                        }
                        return updatedFeature
                    }
                    return f
                })
            }
        }
    })),
    addNewFeature: (value: Feature) => set(({ landing }) => ({
        landing: {
            ...landing,
            features: {
                ...landing.features,
                features: [...landing.features.features, value]
            }
        }
    })),
    deleteFeature: (value: string) => set(({ landing }) => ({
        landing: {
            ...landing,
            features: {
                ...landing.features,
                features: landing.features.features.filter(f => f.title.trim() !== value.trim())
            }
        }
    })),


    //* Faq
    changeFaqItemContent: (oldQuestion: string, value: ChangeFaqItemContent) => set(({ landing }) => ({
        landing: {
            ...landing,
            faq: {
                ...landing.faq,
                faqData: landing.faq.faqData.map(f => {
                    if (f.question.trim() === oldQuestion.trim()) {
                        const updatedFaqItem = {
                            ...f,
                            ...value
                        }
                        return updatedFaqItem
                    }
                    return f
                })
            }
        }
    })),
     addNewFaqItem: (value: FaqItem) => set(({ landing }) => ({
       landing: {
            ...landing,
            faq: {
                ...landing.faq,
                faqData: [...landing.faq.faqData, value]
            }
        }
    })),
    deleteFaqItem: (value: string) => set(({ landing }) => ({
        landing: {
            ...landing,
            faq: {
                ...landing.faq,
                faqData: landing.faq.faqData.filter(f => f.question.trim() !== value.trim())
            }
        }
    }))
}))

