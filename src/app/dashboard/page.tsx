import { Logo } from "@/components";
import { Landinglist } from "@/components/dashboard/Landinglist";
import Link from "next/link";


export default async function DashboardPage() {
  return (
    <main className="w-full p-4">
      <div className="flex gap-2">
        <Logo />
        <span className="text-3xl">Dashboard</span>
      </div>
      <br />
      <Link href={'/started/set-prompt'} className="btn">
        Crear Landing
      </Link>
      <br />
      <br />
      <Landinglist />
    </main >
  );
}
