'use client'

import { LandingGeneratorApi } from "@/api"
import { Landing, LandingListResponse } from "@/interfaces"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MdEdit } from "react-icons/md"

export const Landinglist = () => {

    const [items, setItems] = useState<Landing[]>([])

    useEffect(() => {
    
        LandingGeneratorApi.get<LandingListResponse>('/user/'+ 'ee0e2eb8-f318-4942-b3f8-acc1300695a4')
        .then( resp => {
            const json = resp.data

            setItems(json.data)
            
        })
        .catch(err => console.log(err))

    }, [])

  return (
    <section className="flex flex-col gap-4">
        {
          items.map(item => (
            <div key={item.id} className="flex flex-row justify-between items-center">
              <div className="flex flex-col">
              <span className="text-lg font-bold"> {item.title}</span>
              <span className="text-gray-500">{item.id}</span>
              </div>
              <Link href={`/create/${item.id}`} className="btn flex gap-2">
                <MdEdit />
                Editar
              </Link>
            </div>
          ))
        }
      </section>
  )
}
