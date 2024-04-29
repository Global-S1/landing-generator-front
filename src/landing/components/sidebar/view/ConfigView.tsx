import { changeLandingColor } from '@/landing/actions/changeLandingColor'
import { useLandingStore } from '@/store'
import { ChangeEvent, useState } from 'react'

export const ConfigView = () => {

    const {
        landing:{color, id},
        setColor,
    } = useLandingStore(state => state)

    const [colorinput, setcolorinput] = useState(color)

    const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newColor = event.target.value;
        setcolorinput(newColor);
    }
 
    async function saveColor(){
        changeLandingColor(id, colorinput)
        .then( resp => {
            if(!resp) return;
            setColor(resp.color)
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="p-4">
                <h3 className="font-bold mb-4 text-gray-700">Cambiar color</h3>
                <input
                    value={colorinput}
                    type="color"
                    onChange={onColorChange}
                    className="p-[1px] border-2 w-20 h-10"
                />
            </div>
            <div className="px-4">
            <button className="btn" onClick={saveColor}>
                Guardar
            </button>
            </div>
        </div>
    )
}
