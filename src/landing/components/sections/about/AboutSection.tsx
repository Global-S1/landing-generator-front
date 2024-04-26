import { AboutSectionProps } from '../../../interfaces';

export const AboutSection = ({ title, description, img }: AboutSectionProps) => {
  return (
    <section id='about' className="bg-white">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-600 sm:text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">{title}</h2>
          <p className="mb-4">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img className="w-full rounded-lg" src={img.src} alt={img.alt} />
          <img className="mt-4 w-full lg:mt-10 rounded-lg" src={img.src} alt={img.alt} />
        </div>
      </div>
    </section>
  )
}


{/* <Image className="w-full rounded-lg" src={img.src} alt={img.alt} width={240} height={240} /> */ }
{/* <Image className="mt-4 w-full lg:mt-10 rounded-lg" src={img.src} alt={img.alt} width={240} height={240} /> */ }