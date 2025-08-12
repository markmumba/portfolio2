import { getEssaysForHomepage } from "@/lib/contentful";
import { EssayCard } from "../shared/EssayCard";
import Link from "next/link";

// Helper function to get bento grid classes based on index
function getBentoGridClasses(index: number): string {
    const patterns = [
        "col-span-1 md:col-span-2 row-span-1 md:row-span-2", // Large card (spans 2 cols, 2 rows on md+)
        "col-span-1 row-span-1", // Regular card
        "col-span-1 row-span-1", // Regular card  
        "col-span-1 md:col-span-3 lg:col-span-4 row-span-1", // Wide card (spans full width)
    ];
    return patterns[index % patterns.length];
}

const Essays = async () => {
    const essays = await getEssaysForHomepage();

    if (essays.length === 0) {
        return (
            <section id="essays" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        THOUGHTS & IDEAS
                    </h2>
                    <p className="text-lg text-gray-600 font-inter italic">
                        Where I&apos;m sharing what I&apos;m learning and thinking about
                    </p>
                    <div className="w-32 h-1 bg-black mx-auto mt-6"></div>
                </div>
            </section>
        );
    }

    return (
        <section id="essays" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        THOUGHTS & IDEAS
                    </h2>
                    <p className="text-lg text-gray-600 font-inter italic">
                        Where I share what I&apos;m learning and thinking about
                    </p>
                    <div className="w-32 h-1 bg-black mx-auto mt-6"></div>
                </div>

                {/* Editorial Introduction - Redesigned */}
                <div className=" mb-12">
                    <div className="bg-white p-8 shadow-lg border-l-4 border-black">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">📰</div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4">
                                    EDITORIAL: What I Write About
                                </h3>
                                <p className="text-gray-700 font-inter leading-relaxed">
                                    I write about two main things: <strong>technical deep-dives</strong> where I share what I&apos;ve learned
                                    building systems, and <strong>life & ideas</strong> where I explore the intersection of technology,
                                    philosophy, and human experience. Both are equally important to me.
                                </p>
                            </div>
                        </div>
                    </div>

                  
                </div>

                {/* Bento Grid for Essays */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min mb-12">
                    {essays.map((essay, index) => {
                        const gridClasses = getBentoGridClasses(index);

                        return (
                            <div key={String(essay.id)} className={gridClasses}>
                                <EssayCard essay={essay} />
                            </div>
                        );
                    })}
                </div>

                {/* Call to Action - Redesigned */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-8 shadow-lg border-2 border-gray-200">
                        <h3 className="text-xl font-bold text-black mb-4">
                            📝 LETTERS TO THE EDITOR
                        </h3>
                        <p className="text-gray-700 font-inter mb-6 leading-relaxed">
                            I love discussing ideas, learning from others, and exploring new perspectives.
                            Whether you want to share your own thoughts or just chat about something interesting.
                        </p>
                        <Link
                            href="mailto:mumbamarkian@gmail.com"
                            className="inline-block border-2 border-black text-black px-6 py-3 font-inter hover:bg-black hover:text-white transition-colors duration-200"
                        >
                            Share Your Ideas →
                        </Link>
                    </div>

                    <div className="bg-gradient-to-br from-black to-gray-800 text-white p-8 shadow-lg">
                        <h3 className="text-xl font-bold mb-4">
                            📚 READ THE ARCHIVES
                        </h3>
                        <p className="font-inter mb-6 leading-relaxed text-gray-200">
                            Explore the complete collection of essays, technical deep-dives, and philosophical musings.
                            From system design to life lessons.
                        </p>
                        <Link
                            href="/essays"
                            className="inline-block bg-white text-black px-6 py-3 font-inter hover:bg-gray-100 transition-colors duration-200"
                        >
                            Browse All Essays →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Essays;