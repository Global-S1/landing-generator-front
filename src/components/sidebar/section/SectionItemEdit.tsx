import { useGeneratePageStore } from '@/store';
import { SectionType } from '@/interfaces';
import { EditSectionWithAi } from './EditSectionWithAi';
import { Element } from './element';

export const SectionItemEdit = ({ sectionId }: { sectionId: SectionType }) => {
    const sections = useGeneratePageStore((state) => state.sections);
    const sectionSelected = sections[sectionId];

    return (
        <section className='rounded-md p-4 flex flex-col gap-6'>
            {/* {
                (sectionId != 'hero') && (
                    <div>
                        <input type="checkbox" checked={true} />
                        <label className='ms-2'>Show section</label>
                    </div>
                )
            }

            { (sectionId === 'hero') && <HeroDesign /> } */}

            {
                sectionSelected.map((element) => {
                    return (
                        <Element key={element.id} sectionId={sectionId} element={element} />
                    )
                })
            }
            <EditSectionWithAi sectionId={sectionId} />
        </section>
    )
}

export const HeroDesign = () => {

    return (
        <>
            <span className="text-md font-bold">Design</span>
            <select name="df" id="dsf">
                <option value="">Clasico</option>
                <option value="">Imagen de fondo</option>
                <option value="">Video de fondo</option>
                <option value="">Carrusel de imagenes fondo</option>
            </select>
        </>
    )
}