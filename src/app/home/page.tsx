import { Logo } from "@/components";
import Link from "next/link";

export default async function DashboardPage() {
  return (
    <main className="w-full p-4">
      <div className="flex gap-2">
        <Logo />
        <span className="text-3xl">Home</span>
      </div>
      <br />
      <Link href={'/started/prompt'} className="btn">
        Crear Landing
      </Link>
    </main >
  );
}
