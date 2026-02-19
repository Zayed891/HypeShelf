import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="flex flex-col gap-6 text-center lg:text-left">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        Share your obsession.
                    </h1>
                    <div className="h-1 w-20 bg-neutral-800 rounded-full mx-auto lg:mx-0 my-2"></div>
                    <p className="text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0">
                        The ultimate shelf for your favorite movies, books, games, and tools. Stop scrolling, start discovering what's actually worth your time.
                    </p>
                    <div className="pt-4 flex justify-center lg:justify-start">
                        <Button className="h-14 px-8 text-base font-semibold bg-white text-black hover:bg-neutral-200">
                            START HYPING &rarr;
                        </Button>
                    </div>

                    <div className="pt-12 flex items-center justify-center lg:justify-start gap-8 text-xs font-medium text-neutral-500 uppercase tracking-widest">
                        <span>Curated</span>
                        <span>&bull;</span>
                        <span>Community Driven</span>
                        <span>&bull;</span>
                        <span>No Fluff</span>
                    </div>
                </div>

                {/* Right Visual (Mock Cards) */}
                <div className="relative h-[400px] w-full hidden lg:block">
                    {/* Card 1 */}
                    <div className="absolute top-0 right-0 z-20 w-80 bg-neutral-900 border border-neutral-800 rounded-xl p-4 transform transition-transform hover:-translate-y-2 duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-black text-xs font-bold">M</div>
                                <div>
                                    <div className="text-xs font-bold text-white">Christopher Nolan</div>
                                    <div className="text-[10px] bg-yellow-400 text-black px-1.5 py-0.5 rounded-full inline-block">MUST WATCH</div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Inception</h3>
                        <p className="text-sm text-neutral-500">Sci-Fi &bull; Movie</p>
                    </div>

                    {/* Card 2 */}
                    <div className="absolute top-24 right-12 z-10 w-80 bg-neutral-800 border border-neutral-700 rounded-xl p-4 transform translate-y-4 opacity-90 scale-95">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">B</div>
                            <div>
                                <div className="text-xs font-bold text-white">Andy Weir</div>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Project Hail Mary</h3>
                        <p className="text-sm text-neutral-400">Sci-Fi &bull; Book</p>
                    </div>

                    {/* Card 3 (Bottom) */}
                    <div className="absolute top-48 right-4 z-0 w-80 bg-neutral-900 border border-neutral-800 rounded-xl p-4 transform translate-y-8 opacity-80 scale-90">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
                            <div>
                                <div className="text-xs font-bold text-white">Supergiant</div>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Hades II</h3>
                        <p className="text-sm text-neutral-500">Roguelike &bull; Game</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
