import { AboutSectionProps } from '../../../interfaces';

export const AboutSection = ({ title, description, img }: AboutSectionProps) => {
  return (
    <section id="about" >
    <div className="container mx-auto py-[100px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
                <p className="mt-4 text-gray-600 text-lg">
                  {description}
                  </p>
                
            </div>
            <div className="mt-12 md:mt-0">
                <img src={img.src} alt={img.alt} className="object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </div>
</section>
  )
}


{/* <Image classNameNameName="w-full rounded-lg" src={img.src} alt={img.alt} width={240} height={240} /> */ }
{/* <Image classNameNameName="mt-4 w-full lg:mt-10 rounded-lg" src={img.src} alt={img.alt} width={240} height={240} /> */ }