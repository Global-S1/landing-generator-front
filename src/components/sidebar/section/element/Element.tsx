import { ImageElementSection } from './ImageElementSection';
import { TitleElementSection } from './TitleElementSection'
import { ElementToEdit, SectionType } from '@/interfaces/api-response';
import { LinkElementSection } from './LinkElementSection';
import { DescriptionElementSection } from './DescriptionElementSection';

export interface ElementProps {
    sectionId: SectionType;
    element: ElementToEdit;
}

export const Element = (props: ElementProps) => {

    const { element } = props

    if (element.type === 'title' || element.type === 'subtitle') {
        return <TitleElementSection {...props} />
    }
    if (element.type === 'img') {
        return <ImageElementSection {...props} />
    }
    if (element.type === 'link') {
        return <LinkElementSection {...props} />
    }
    if (element.type === 'description') {
        return (<DescriptionElementSection {...props} />)
    }

}
