import { SectionType } from '@/interfaces'
import React from 'react'

interface Props {
  sectionId: SectionType;
  status: boolean;
}

export const DisplaySection = ({ sectionId, status }: Props) => {


  return (
    <div className="topping flex flex-row gap-2">
      <input type="checkbox" id="topping" name="topping" value="ACTIVE" checked={status} />
      Mostrar sección
    </div>
  )
}
