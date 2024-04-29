import { SectionType } from "@/interfaces";
import { SectionItem } from "../SectionItem";

interface Props {
    sections: SectionType[];
}

export const SectionList = ({ sections }: Props) => {
    return (
        <section className="flex flex-col gap-4 mt-4">
            {
                sections.map(item => (
                    <SectionItem key={item} sectionId={item} />
                ))
            }
        </section>
    )
}
