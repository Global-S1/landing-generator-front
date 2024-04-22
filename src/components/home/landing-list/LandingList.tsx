import { getLandings } from "@/landing/actions"
import { LandingListItem } from "./LandingListItem"

export const LandingList = async () => {

    const landings = await getLandings()

    return (
        <div className="pt-4">
            {
                landings.map(item => (
                    <LandingListItem key={item.id} landing={item} />
                ))
            }
        </div>
    )
}
