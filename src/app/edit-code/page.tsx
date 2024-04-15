import { Logo } from "@/components";

export default async function EditPage() {
  return (
    <main className="w-full p-4">
      <div className="flex gap-2">
        <Logo />
        <span className="text-3xl">Edit code</span>
      </div>
      <br />
      
    </main >
  );
}
