import { Logo } from "@/components";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUserServerSession } from "@/auth/actions/getUserSession";

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
    </main >
  );
}
