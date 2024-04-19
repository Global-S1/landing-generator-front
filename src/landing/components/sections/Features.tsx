import { Feature, FeaturesSectionProps } from "../../interfaces";

const FeatureItem = ({ img, title, description }: Feature) => {

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={img.src} alt={img.src} className="mb-4 h-24 w-24 object-contain" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export const FeaturesSection = ({ title, features }: FeaturesSectionProps) => {

  return (
    <section className="py-[200px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} img={feature.img} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
};
// <Image src={img.src} alt={img.src} className="mb-4 h-24 w-24 object-contain" width={240} height={240} />
