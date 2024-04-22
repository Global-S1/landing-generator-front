
import { Landing } from "@prisma/client";
import Link from "next/link";
import { MdEdit } from "react-icons/md";

interface Props {
  landing: Landing;
}

export const LandingListItem = ({ landing }: Props) => {

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <span className="text-lg font-bold"> {landing.title}</span>
        <span className="text-gray-500">{landing.id}</span>
      </div>
      <Link href={`/edit-page/${landing.id}`} className="btn flex gap-2">
        <MdEdit />
        Editar
      </Link>
    </div>
  )
}
