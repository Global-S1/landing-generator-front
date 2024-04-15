import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <span className="bg-black text-2xl text-white font-bold font-sans px-2 py-1 rounded-md">
                LPB
            </span>
        </Link>
    )
}
