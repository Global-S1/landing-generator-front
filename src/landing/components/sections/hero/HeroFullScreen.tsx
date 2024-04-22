import { HeroSectionProps } from "@/landing/interfaces"

export const HeroFullScreen = ({ title, description, img, button }: HeroSectionProps) => {
  return (
    <section id="hero" className="flex flex-wrap">
    <div className="w-full sm:w-8/12 mb-10">
      <div className="container mx-auto h-full sm:p-10">
        <nav className="flex px-4 justify-between items-center">
          <div>
            <img src="https://image.flaticon.com/icons/svg/497/497348.svg" alt="" className="w-8" />
          </div>
        </nav>
        <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
          <div className="w-full">
            <h1 className="text-4xl lg:text-6xl font-bold">{title}</h1>
            <div className="w-20 h-2 bg-pink-500 my-4"></div>
            <p className="text-xl mb-10">{description}</p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white text-2xl font-medium px-4 py-2 rounded shadow">{button.text}</button>
          </div>
        </header>
      </div>
    </div>
    <img src={img.src} alt={img.alt} className="w-full h-48 object-cover sm:h-screen sm:w-4/12"/>
  </section>
  )
}
