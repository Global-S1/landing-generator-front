"use client";

import { LandingGeneratorApi } from "@/api";
import { MainContent } from "@/components/main-content";
import { Sidebar } from "@/components/sidebar";
import { APILandingExistResponse, APIResponse } from "@/interfaces";
import { useGeneratePageStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GeneratorPage({params}:{params: {id: string}}) {
  const router = useRouter();

  const html = useGeneratePageStore((state) => state.html);
  const landingId = useGeneratePageStore((state) => state.landingId);
  const setPageHtml = useGeneratePageStore((state) => state.setPageHtml);
  const setLandingId = useGeneratePageStore((state) => state.setLandingId);
  const setSections = useGeneratePageStore((state) => state.setSections);

  useEffect(() => {
    if (html) return;

    LandingGeneratorApi.get<APIResponse>(`/${params.id}`)
      .then(resp => {
        const data = resp.data

        if (data.template) {
          setLandingId(data.id)
          setPageHtml(data.template);
          setSections(data.sections)
        } else {
          router.push("/");
        }
      })
      .catch(err => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-4">
        <span className="bg-black text-2xl text-white font-bold font-sans px-2 py-1 rounded-md">
          LPB
        </span>
      </div>
      <div className="grid grid-cols-[450px_1fr] h-[90vh] overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
    </>
  );
}
