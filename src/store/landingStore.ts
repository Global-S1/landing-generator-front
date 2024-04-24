import { SectionType } from "@/interfaces";
import { About, Cta, Faq, FaqItem, Feature, Features, Footer, Hero, Landing, LandingResponse } from "../landing/interfaces";
import { Header } from "@/landing/interfaces";
import { create } from "zustand";


interface SetInitState {
    landing: Landing;
    header: Header;
    hero: Hero;
    about: About;
    features: Features;
    faq: Faq;
    cta: Cta;
    footer: Footer;
}

interface LandingState {
    landing: Landing;
    header: Header;
    hero: Hero;
    about: About;
    features: Features;
    faq: Faq;
    cta: Cta;
    footer: Footer;

    sectionsId: SectionType[];
    setState: (value: SetInitState) => void;
    setSections: (value: SectionType[]) => void;

    changeFeatureItemContent: (oldTitle: string, value: ChangeFeatureItemContent) => void;

    changeHeroContent: (value: ChangeHeroContent) => void;
    changeAboutContent: (value: ChangeAboutContent) => void;
    changeCtaContent: (value: ChangeCtaContent) => void;

    addNewFeature: (value: Feature) => void;
    deleteFeature: (title: string) => void;

    changeFaqItemContent: (oldQuestion: string, value: ChangeFaqItemContent) => void;
    addNewFaqItem: (value: FaqItem) => void;
    deleteFaqItem: (value: string) => void;

}

interface ChangeHeroContent extends Omit<Hero, "id" | "layout" | "landingId"> { }
interface ChangeAboutContent extends Omit<About, "id" | "layout" | "landingId"> { }

interface ChangeFeatureItemContent extends Partial<Feature> { }
interface ChangeFeaturesContent extends Omit<Features, "id" | "layout" | "landingId"> { }
interface ChangeFaqItemContent {
    question?: string;
    answer?: string;
}
interface ChangeFaqContent extends Omit<Faq, "id" | "layout" | "landingId"> { }
interface ChangeCtaContent extends Omit<Cta, "id" | "layout" | "landingId"> { }

export const useLandingStore = create<LandingState>((set) => ({
    landing: {} as Landing,
    header: {} as Header,
    hero: {} as Hero,
    about: {} as About,
    features: {} as Features,
    faq: {} as Faq,
    cta: {} as Cta,
    footer: {} as Footer,
    sectionsId: ['header', 'hero', 'about', 'features', 'faq', 'cta', 'footer'],

    setSections: (value: SectionType[]) => set({
        sectionsId: [...value]
    }),
    setState: (value: SetInitState) => set({
        ...value
    }),

    changeHeroContent: (value: ChangeHeroContent) => set(({ hero }) => ({
        hero: {
            ...value,
            id: hero.id,
            layout: hero.layout,
            landingId: hero.landingId,
        },
    })),
    changeAboutContent: (value: ChangeAboutContent) => set(({ about }) => ({
        about: {
            ...value,
            id: about.id,
            layout: about.layout,
            landingId: about.landingId,
        },
    })),
    changeCtaContent: (value: ChangeCtaContent) => set(({ cta }) => ({
        cta: {
            ...value,
            id: cta.id,
            layout: cta.layout,
            landingId: cta.landingId,
        }
    })),


    // Features
    changeFeatureItemContent: (oldTitle: string, value: ChangeFeatureItemContent) => set(({ features }) => ({
        features: {
            ...features,
            features: features.features.map(f => {
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
    })),
    addNewFeature: (value: Feature) => set(({ features }) => ({
        features: {
            ...features,
            features: [...features.features, value]
        }
    })),
    deleteFeature: (title: string) => set(({ features }) => ({
        features: {
            ...features,
            features: features.features.filter(f => f.title.trim() !== title.trim())
        }
    })),


    // Faq
    changeFaqItemContent: (oldQuestion: string, value: ChangeFaqItemContent) => set(({ faq }) => ({
        faq: {
            ...faq,
            faqData: faq.faqData.map(f => {
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
    })),
    addNewFaqItem: (value: FaqItem) => set(({ faq }) => ({
        faq: {
            ...faq,
            faqData: [...faq.faqData, value]
        }
    })),
    deleteFaqItem: (question: string) => set(({ faq }) => ({
        faq: {
            ...faq,
            faqData: faq.faqData.filter(f => f.question.trim() !== question.trim())
        }
    })),

}))