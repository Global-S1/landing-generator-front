import { Hero } from '@/landing/interfaces'
import React from 'react'
import { HeroClassic } from './HeroClassic'
import { HeroBgImage } from './HeroBgImage'
import { HeroFullScreen } from './HeroFullScreen'

export const HeroSection = (hero: Hero) => {

  const {layout: {id: option}} = hero

  if(option === '1'){
    return <HeroClassic {...hero}/>
  }
  if(option === '2'){
    return <HeroBgImage {...hero}/>
  }
  if(option === '3'){
    return <HeroFullScreen {...hero}/>
  }

  return (
    <div>Hero section</div>
  )
}
