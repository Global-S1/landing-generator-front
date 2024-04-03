import { redirect } from "next/navigation";
import { LandingGeneratorApi } from "@/api";
import { APILandingExistResponse } from "@/interfaces";

export const dynamic = 'force-dynamic'

export default async function Home() {
  // const resp = await LandingGeneratorApi.get<APILandingExistResponse>('/85044f21-e181-4850-abe8-9b2fb7572cbc')
  // const json = resp.data
  // console.log(json)

  // if (json.template) {
  //   redirect('/create')
  // } else {
  //   redirect('/started/set-prompt')
  // }

  redirect('/dashboard')
}
