'use client';

import { useEffect } from "react";
import { useDesignStore, useLandingStore } from "@/store";
import { SkeletonEditPage, TopBar } from "@/components";
import { getLanding } from "@/landing/actions";
import { Landing, Sidebar } from "@/landing/components";
import { LandingContent } from "@/landing/interfaces";
import { SectionsLayout } from "@/interfaces";

export default function EditPage({ params }: { params: { id: string } }) {

  const landingId = useLandingStore(state => state.id);
  const {
sectionsLayout,

    setLandingContent,
    setTitle,
    setServerLanding,
    setSectionsLayout
  } = useLandingStore(state => state);

  const setHeroOption = useDesignStore(state => state.setHeroOption);


  useEffect(() => {
    if (landingId === params.id) return

    getLanding(params.id)
      .then(landing => {
        if (!landing) return;
        setLandingContent(landing.id, landing.content as unknown as LandingContent);
        setServerLanding(landing.content as unknown as LandingContent);
        setTitle(landing.title);
        setSectionsLayout(landing.sectionsLayout as unknown as SectionsLayout);
        localStorage.setItem('sectionsLayout', JSON.stringify(sectionsLayout));
      })
  }, [])


  useEffect(() => {
    
    setHeroOption(sectionsLayout.hero.id)

  }, [sectionsLayout])
  

  return (
    <>
      <TopBar />
      {
        (!landingId)
          ? <SkeletonEditPage />
          : <main>
            <Sidebar />
            <div className={`ms-[400px] pt-[50px]`}>
              <Landing />
            </div>
          </main>
      }
    </>
  );
}
