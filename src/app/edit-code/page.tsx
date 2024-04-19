import { Landing } from "@/landing/components/Landing";
import { Sidebar } from "@/landing/components/sidebar/Sidebar";

export default async function EditPage() {

  return (
    <main>

      <Sidebar />
      <div className={`ms-[400px]`}>
        <Landing />
      </div>
    </main>
  );
}
