import { Landinglist } from "@/components/dashboard/Landinglist";
import Link from "next/link";


export default async function DashboardPage() {
  return (
    <main className="w-full p-4">
      <h1 className="text-3xl">Dashboard</h1>
      <br />
      <Link href={'/started/set-prompt'} className="btn">
        Crear Landing
      </Link>
      <br />
      <br />
      <Landinglist/>
    </main >
  );
}
