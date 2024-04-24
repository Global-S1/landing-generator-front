import { Faq } from "@/landing/interfaces"
import { FaqClassic } from "./FaqClassic"
import { FaqDynamic } from "./FaqDynamic"

export const FaqSection = (faq: Faq) => {
    const {layout: {id: option}} = faq

    if(option === '1'){
      return <FaqClassic {...faq}/>
    }
    if(option === '2'){
      return <FaqDynamic {...faq}/>
    }
  
    return (
      <div>Faq section</div>
    )
}
