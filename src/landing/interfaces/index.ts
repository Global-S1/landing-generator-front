export * from './landing-response';

export interface LandingContent {
    hero: HeroSectionProps;
    about: AboutSectionProps;
    features: FeaturesSectionProps;
    faq: FaqSectionProps;
    cta: CtaSectionProps;
    footer: FooterSectionProps;
}

export interface HeroSectionProps {
    title: string;
    description: string;
    button: {
        text: string;
        link: string;
    };
    img: {
        alt: string;
        src: string;
    }
}
export interface AboutSectionProps {
    title: string;
    description: string;
    img: {
        alt: string;
        src: string;
    }
}
export interface FeaturesSectionProps {
    title: string;
    features: Feature[];
}

export interface Feature {
    title: string;
    description: string;
    img: {
        alt: string;
        src: string;
    }
}

export interface FaqSectionProps {
    title: string;
    faqData: FaqItem[];
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface CtaSectionProps {
    title: string;
    description: string;
    button: {
        text: string;
        link: string;
    };
}

export interface FooterSectionProps {
    socials: Social[];
}

export interface Social { name: string, link: string }