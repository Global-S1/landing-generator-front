import { SectionType } from "@/interfaces"
import {
    EditHeaderSection,
    EditHeroSection,
    EditAboutSection,
    EditFeaturesSection,
    EditCtaSection,
    EditFaqSection,
    EditFooterSection
} from "./edit"


export const SectionContent = ({ sectionId }: { sectionId: SectionType }) => {

    if (sectionId === 'header') {
        return <EditHeaderSection />
    }
    if (sectionId === 'hero') {
        return <EditHeroSection />
    }
    if (sectionId === 'about') {
        return <EditAboutSection />
    }
    if (sectionId === 'features') {
        return <EditFeaturesSection />
    }
    if (sectionId === 'faq') {
        return <EditFaqSection />
    }
    if (sectionId === 'cta') {
        return <EditCtaSection />
    }
    if (sectionId === 'footer') {
        return <EditFooterSection />
    }

    return (
        <div>EditHeroSection</div>
    )
}
