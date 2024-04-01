import { TitleElementSection, ImageElementSection, DescriptionElementSection, LinkElementSection } from './'
import { ElementToEdit, SectionType } from '@/interfaces';

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
