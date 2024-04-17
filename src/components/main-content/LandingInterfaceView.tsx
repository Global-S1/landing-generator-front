import { useGeneratePageStore, useUiStore } from "@/store";
import { EditorCodeView, LoaderEditSecion, TopMenu } from ".";

export const LandingInterfaceView = () => {
  const html = useGeneratePageStore((state) => state.html);
  const loadingEditSection = useUiStore((state) => state.loadingEditSection);

  const showCode = useUiStore((state) => state.showCode);

  return (
    <div className="relative w-full h-full border-2 rounded-xl border-gray-300  overflow-hidden m-auto">
      <section className="bg-gray-200 p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-[15px] h-[15px] rounded-full bg-gray-400"></div>
          <div className="w-[15px] h-[15px] rounded-full bg-gray-400"></div>
          <div className="w-[15px] h-[15px] rounded-full bg-gray-400"></div>
        </div>
        <TopMenu />

      </section>
      {loadingEditSection && <LoaderEditSecion />}

      {
        (showCode)
          ? <iframe srcDoc={html} className="w-full h-full" />
          : <EditorCodeView />
      }
    </div>
  );
};
