import { SectionType } from '@/interfaces';
import React, { ChangeEvent } from 'react';

interface Props {
  status: boolean;
  onChangeContent: (value: boolean) => void;
}

export const DisplaySection = ({ status, onChangeContent }: Props) => {

  const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;

    onChangeContent(value);
  }

  return (
    <div className="topping flex flex-row items-center gap-2">
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={status}
          name="topping"
          onChange={onCheckboxChange}
          />
        <span className="slider"></span>
      </label>
          <span>
            Mostrar sección
          </span>
    </div>
  )
}
