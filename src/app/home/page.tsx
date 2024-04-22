import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LandingList, Logo } from "@/components";

export default async function DashboardPage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/api/auth/signin')
  }

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

      <LandingList />

    </main >
  );
}
