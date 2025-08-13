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
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-heading">
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
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-heading">
                        THOUGHTS & IDEAS
                    </h2>
                    <p className="text-lg text-gray-600 font-inter italic">
                        Where I share what I&apos;m learning and thinking about
                    </p>
                    <div className="w-32 h-1 bg-black mx-auto mt-6"></div>
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
                <div className="text-center mt-12">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <Link
                            href="/essays"
                            className="text-gray-600 font-inter text-sm hover:text-black transition-colors duration-200"
                        >
                            View All Essays →
                        </Link>
                        <span className="text-gray-300">•</span>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Essays;