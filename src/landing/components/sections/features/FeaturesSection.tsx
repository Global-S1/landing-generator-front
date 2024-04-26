import { Features } from "../../../interfaces";
import { FeaturesAi } from "./FeaturesAi";
import { FeaturesCards } from "./FeaturesCards";
import { FeaturesSimple } from "./FeaturesSimple";


export const FeaturesSection = (features: Features) => {
  const { layout: { id: option } } = features

  if (option === '1') {
    return <FeaturesSimple {...features} />
  }
  if (option === '2') {
    return <FeaturesCards {...features} />
  }
  if (option === '3') {
    return <FeaturesAi{...features} />
  }

  return (
    <div>Features section</div>
  )
};