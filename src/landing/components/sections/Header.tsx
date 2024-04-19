
interface Props {
  logo: string;
  image?: string;
}

export const Header = ({ logo, image }: Props) => {
  return (
    <header id="header" className="bg-black shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div>
            <span className='text-3xl font-bold'>{logo}</span>
        </div>
        <div>
          {/* <img src={image} alt="Header Image" className="h-12 w-auto" /> */}
        </div>
      </div>
    </header>
  );
};