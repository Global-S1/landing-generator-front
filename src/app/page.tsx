import { redirect } from "next/navigation";
import { DescriptionLandingForm, SelectTemplate } from "@/components/initial";

export const dynamic = 'force-dynamic'

export default async function Home() {

  const resp = await fetch('http://localhost:3001/api/landing/exist')

  if (!resp.ok) {
    redirect('/started/set-prompt')

  }
  const json = await resp.json()


  if (json.template) {
    redirect('/create')
  } else {
    redirect('/started/set-prompt')
  }
}
