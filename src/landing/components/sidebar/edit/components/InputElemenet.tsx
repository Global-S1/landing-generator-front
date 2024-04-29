import { ChangeEvent, useState } from "react";
import { SiCodemagic } from "react-icons/si";
import { ModalTextAi } from "./ModalTextAi";

interface Props {
    label: string;
    data: { value: string; placeholder?: string; name: string }
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputElemenet = ({ label, data, onInputChange }: Props) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const { value, placeholder, name } = data;

    return (
        <div>
            <div className="flex gap-4 mb-2">
                <label className="font-bold"> {label}</label>
                <button
                    className="text-purple-400 font-bold flex gap-2 justify-center items-center"
                    onClick={handleOpen}
                >
                    AI
                    <SiCodemagic />
                </button>
            </div>
            <input
                className="input"
                type="text"
                placeholder={placeholder ?? 'placeholder'}
                value={value}
                name={name}
                onChange={onInputChange} />
           
           <ModalTextAi defaultText="dfa" open={open} handleClose={handleClose}/>
        </div>
    )
}
