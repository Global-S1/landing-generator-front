import { DescriptionLandingForm } from "@/components/initial";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="w-full flex justify-center pt-[100px]">
      <div className="promptContainer">
        <h1 className="text-4xl font-bold font-sans text-center pb-10">
          ¿Cuál es la idea de tu negocio?
        </h1>
        <DescriptionLandingForm />
      </div>
    </main>
  );
}
