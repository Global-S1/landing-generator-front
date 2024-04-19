import { SectionType } from "@/interfaces"
import { EditHeroSection, EditAboutSection, EditFeaturesSection, EditCtaSection, EditFaqSection } from "./edit"


export const SectionContent = ({ sectionId }: { sectionId: SectionType }) => {

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

    return (
        <div>EditHeroSection</div>
    )
}
