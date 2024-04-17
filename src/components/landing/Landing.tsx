import { AboutSection } from "./About"
import { CtaSection } from "./Cta"
import { FeaturesSection } from "./Features"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { HeroSection } from "./Hero"

export const Landing = () => {

    return (
        <div className="app">
            <Header logo="Sabrocito" />
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <CtaSection />
            <Footer />
        </div>
    )
}
