import { Header } from "@/landing/interfaces";

export const HeaderSection = ({ title }: Header) => {
  return (
    <header id="header" className="bg-black shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div>
          <span className='text-3xl font-bold'>{title}</span>
        </div>
        <div>
          {/* <img src={image} alt="Header Image" className="h-12 w-auto" /> */}
        </div>
      </div>
    </header>
  );
};