import { redirect } from "next/navigation";
import { LandingGeneratorApi } from "@/api";
import { APILandingExistResponse } from "@/interfaces";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const resp = await LandingGeneratorApi.get<APILandingExistResponse>('/exist')
  const json = resp.data

  if (json.template) {
    redirect('/create')
  } else {
    redirect('/started/set-prompt')
  }
}
