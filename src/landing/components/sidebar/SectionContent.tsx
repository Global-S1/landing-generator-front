import { SectionType } from "@/interfaces"
import { EditHeroSection } from "./edit/EditHeroSection"
import { EditAboutSection } from "./edit/EditAboutSection"
import { EditFeaturesSection } from "./edit/EditFeaturesSection"
import { EditFaqSection } from "./edit/EditFaqSection"
import { EditCtaSection } from "./edit/EditCtaSection"

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
