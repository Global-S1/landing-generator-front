import { useGeneratePageStore } from '@/store'
import { SectionType } from '@/interfaces/api-response'
import { EditSectionWithAi } from './EditSectionWithAi';
import { Element } from './element/Element';

export const SectionItemEdit = ({ sectionId }: { sectionId: SectionType }) => {
    const sections = useGeneratePageStore((state) => state.sections);
    const sectionSelected = sections[sectionId]

    return (
        <div className='rounded-md p-4 flex flex-col gap-6'>
            {
                sectionSelected.map((element, idx) => {
                    return (
                        <Element key={idx} sectionId={sectionId} element={element} />
                    )
                })
            }

            <EditSectionWithAi sectionId={sectionId} />
        </div>
    )
}
