import { Hero } from "@/landing/interfaces"
import { useLandingStore } from "@/store"

export const HeroFullScreen = ({ title, description, img, button }: Hero) => {
  
  const {landing: {color}} = useLandingStore(state => state);

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
            <div className="w-20 h-2 my-4" style={{backgroundColor: color}}></div>
            <p className="text-xl mb-10">{description}</p>
            <button 
            className="text-white text-xl font-medium px-4 py-2 rounded shadow"
            style={{
              backgroundColor: color
            }}
            >{button.text}</button>
          </div>
        </header>
      </div>
    </div>
    <img src={img.src} alt={img.alt} className="w-full h-48 object-cover sm:h-screen sm:w-4/12"/>
  </section>
  )
}
