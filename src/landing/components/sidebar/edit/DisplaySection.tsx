import { SectionType } from '@/interfaces'
import { useLandingStore } from '@/store';
import React from 'react'

interface Props {
  sectionId: SectionType;
}

export const DisplaySection = ({ sectionId }: Props) => {

  const { sectionsLayout } = useLandingStore(state => state);

  return (
    <div className="topping flex flex-row gap-2">
      <input type="checkbox" id="topping" name="topping" value="ACTIVE" checked={sectionsLayout[sectionId].status} />
      Mostrar sección
    </div>
  )
}
