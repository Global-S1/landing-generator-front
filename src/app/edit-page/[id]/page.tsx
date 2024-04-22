'use client';

import { useEffect } from "react";
import { SkeletonEditPage, TopBar } from "@/components";
import { getLanding } from "@/landing/actions";
import { Landing, Sidebar } from "@/landing/components";
import { LandingContent } from "@/landing/interfaces";
import { useLandingStore } from "@/store";

export default function EditPage({ params }: { params: { id: string } }) {

  const landingId = useLandingStore(state => state.id);
  const setLandingContent = useLandingStore(state => state.setLandingContent);
  const setServerLanding = useLandingStore(state => state.setServerLanding);

  useEffect(() => {
    if (landingId === params.id) return

    getLanding(params.id)
      .then(landing => {
        if (!landing) return;
        setLandingContent(landing.id, landing.content as unknown as LandingContent);
        setServerLanding(landing.content as unknown as LandingContent)
      })
  }, [])

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
