import Link from "next/link";
import { MdEdit } from "react-icons/md";

const elements = [1, 2, 3, 4, 5]

export default async function DashboardPage() {
  return (
    <main className="w-full p-4">
      <h1 className="text-3xl">Dashboard</h1>
      <br />
      <Link href={'/started/categories'} className="btn">
        Crear Landing
      </Link>
      <br />
      <br />
      <section className="flex flex-col gap-4">
        {
          elements.map(el => (
            <div key={el} className="flex flex-row justify-between">
              <span className="text-lg">Landing page {el}</span>
              <Link href={'/create'} className="btn flex gap-2">
                <MdEdit />
                Editar
              </Link>
            </div>
          ))
        }
      </section>
    </main >
  );
}
