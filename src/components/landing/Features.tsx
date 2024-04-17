
interface Props {
  image: string;
  title: string;
  description: string;
}

const featuresData: Props[] = [
    {
      image: "https://via.placeholder.com/150",
      title: "Delivery rápido",
      description: "Entregamos tu comida rápida caliente y fresca directamente a tu puerta.",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Menú variado",
      description: "Ofrecemos una amplia selección de platos, desde hamburguesas clásicas hasta ensaladas frescas.",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Servicio amable",
      description: "Nuestro personal amable y atento está listo para ayudarte con tus pedidos y preguntas.",
    },
  ];

const Feature = ({ image, title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={image} alt={title} className="mb-4 h-24 w-24 object-contain" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-[200px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
            <Feature key={index} image={feature.image} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
};
