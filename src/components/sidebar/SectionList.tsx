"use client";
import { useGeneratePageStore } from "@/store/generatePageStore";
import { SectionItem } from "./section/SectionItem";
import { SectionType } from "@/interfaces/api-response";

export const SectionList = () => {

  const sections = useGeneratePageStore((state) => state.sections);

  return (
    <>
      <div className="flex flex-col gap-4 h-[90vh] overflow-y-scroll p-4">
        {Object.keys(sections).map((section) => (
          <SectionItem key={section} title={section} sectionId={section as SectionType} />
        ))}
      </div>
    </>
  );
};
