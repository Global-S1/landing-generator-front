import { ChangeEvent } from "react";

interface Option {
    name: string,
    option: string
}

interface Props {
    options: Option[];
    defaultValue: string;
    onchangeOption: (opt: string) => void;
}

export const InputChangeLayout = ({ options, defaultValue, onchangeOption }: Props) => {

    const onOptionChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;

        onchangeOption(option);
    };
    return (
        <div className="flex flex-col gap-2">
            <span className="font-bold">Elije un diseño</span>
            <select className='input' onChange={onOptionChangeHandler} defaultValue={defaultValue} >
                {options.map(option => (
                    <option key={option.option} value={option.option}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
