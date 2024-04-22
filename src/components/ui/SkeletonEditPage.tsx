

export const SkeletonEditPage = () => {
    return (
        <div className="grid grid-cols-[400px_1fr] h-screen pt-[50px]">
            <aside className="border-e-[1px] border-gray-100 p-4">
                <section className="flex flex-col gap-4 animate-pulse">
                    {
                        Array.from({ length: 7 }).map((_, idx) => idx + 1).map(item => (
                            <div
                                key={item}
                                className="w-full h-[50px] bg-gray-100 rounded">
                            </div>
                        ))
                    }
                </section>
            </aside>
            <main>
                <div>
                    <section className="grid grid-cols-2 pt-[50px] gap-4 p-4 animate-pulse">
                        <div className="flex flex-col">
                            <div>
                                <div className="w-full h-[40px] bg-gray-100 rounded"></div>
                            </div>
                            <div className="flex flex-col gap-2 mt-8">
                                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                            </div>
                            <div className="flex gap-4 mt-8">
                                <span className="w-[100px] h-[30px] bg-gray-100 rounded"></span>
                                <span className="w-[100px] h-[30px] bg-gray-100 rounded"></span>
                            </div>
                        </div>
                        <div>
                            <div className="w-full h-[250px] bg-gray-100 rounded"></div>
                        </div>
                    </section>
                    <section className="grid grid-cols-2 pt-[100px] gap-4 p-4 animate-pulse">
                        <div>
                            <div className="w-full h-[250px] bg-gray-100 rounded"></div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <div className="w-full h-[40px] bg-gray-100 rounded"></div>
                            </div>
                            <div className="flex flex-col gap-2 mt-8">
                                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                            </div>

                        </div>

                    </section>

                </div>
            </main>
        </div>
    )
}
