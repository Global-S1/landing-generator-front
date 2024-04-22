import { getLandings } from "@/landing/actions"
import { LandingListItem } from "./LandingListItem"
import { Landing } from "@prisma/client/wasm";

export const LandingList = async () => {

    const landings: Landing[] = await getLandings();

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
