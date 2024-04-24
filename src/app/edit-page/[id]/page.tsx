'use client';

import { useEffect } from "react";
import { SkeletonEditPage, TopBar } from "@/components";
import { getLandingContent } from "@/landing/actions";
import { Landing, Sidebar } from "@/landing/components";
import { About, Cta, Faq, Features, Footer, Header, Hero, LandingContent } from "@/landing/interfaces";
import { useLandingStore } from "@/store/landingStore";

export default function EditPage({ params }: { params: { id: string } }) {

  // const landingId = useLandingStore(state => state.id);
  const {landing, setState} = useLandingStore( state => state);
  const {id: landingId} = landing;

  // const {
  //   sectionsLayout,

  //   setLandingContent,
  //   setTitle,
  //   setServerLanding,
  //   setSectionsLayout
  // } = useLandingStore(state => state);


  useEffect(() => {
    if (landingId === params.id) return;

    getLandingContent(params.id)
      .then(resp => {
        if (!resp) return;
        const {header, hero, about, features, faq, cta, footer, landing} = resp;
        setState({
          landing,
          sections:{
            header: header as Header,
            hero: hero as unknown as Hero,
            about: about as unknown as About,
            features: features as unknown as Features,
            faq: faq as unknown as Faq,
            cta: cta as unknown as Cta,
            footer: footer as Footer,
          }
        })
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
