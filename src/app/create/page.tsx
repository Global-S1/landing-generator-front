"use client";

import { MainContent } from "@/components/main-content";
import { Sidebar } from "@/components/sidebar";
import { useGeneratePageStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GeneratorPage() {
  const router = useRouter();

  const html = useGeneratePageStore((state) => state.html);
  const setPageHtml = useGeneratePageStore((state) => state.setPageHtml);
  const setSections = useGeneratePageStore((state) => state.setSections);

  useEffect(() => {
    if (html) return;

    fetch("http://localhost:3001/api/landing/exist")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.template) {
          setPageHtml(data.template);
          setSections(data.sections)
        } else {
          console.log(data);
          router.push("/");
        }
      });
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
