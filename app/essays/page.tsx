import { getEssays } from "@/lib/contentful";
import { EssayCard } from "@/components/shared/EssayCard";
import { Essays } from "@/lib/definition";
import Link from "next/link";

// Helper function to get bento grid classes for essays
function getEssayGridClasses(index: number): string {
    // Create varied layouts for visual interest
    const patterns = [
        "col-span-1 md:col-span-2 row-span-1", // Wide card
        "col-span-1 row-span-1", // Regular card
        "col-span-1 row-span-1", // Regular card
        "col-span-1 md:col-span-2 row-span-1", // Wide card
        "col-span-1 row-span-1", // Regular card
        "col-span-1 row-span-1", // Regular card
    ];
    return patterns[index % patterns.length];
}

export default async function EssaysPage() {
    const essays = await getEssays();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b-2 border-gray-200 py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                            Essays & Thoughts
                        </h1>
                        <p className="text-base text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
                            A collection of technical deep-dives, philosophical musings, and everything
                            I&apos;m learning along the way. From distributed systems to life lessons.
                        </p>
                        <div className="w-32 h-1 bg-black mx-auto mt-8"></div>
                    </div>
                </div>
            </header>

            {/* Navigation Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center text-sm text-gray-600 font-inter">
                        <Link href="/" className="hover:text-black transition-colors">
                            Home
                        </Link>
                        <span className="mx-2">→</span>
                        <span className="text-black font-medium">Essays</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Editorial Note */}
                    <div className="bg-white p-8 border-l-4 border-black shadow-lg mb-12">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">📝</div>
                            <div>


                                <p className="text-gray-700 font-inter leading-relaxed text-sm">
                                    <strong>Pro tip:</strong> At the end of each essay, there&apos;s a random nugget of wisdom
                                    from my recent reading—philosophy, life lessons, or interesting perspectives I&apos;ve encountered.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Essays Grid */}
                    {essays.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min mb-12">
                            {essays.map((essay, index) => {
                                const gridClasses = getEssayGridClasses(index);
                                return (
                                    <div key={String(essay.id)} className={gridClasses}>
                                        <EssayCard essay={essay as Essays} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white shadow-lg">
                            <div className="text-6xl mb-6">📄</div>
                            <h3 className="text-2xl font-bold text-black mb-4">
                                No Essays Yet
                            </h3>
                            <p className="text-gray-600 font-inter">
                                Check back soon for new thoughts and technical deep-dives.
                            </p>
                        </div>
                    )}

                    {/* Simple breadcrumb to go home */}
                    <div className="text-center mt-12">
                        <Link
                            href="/"
                            className="text-gray-600 font-inter hover:text-black transition-colors duration-200"
                        >
                            ← Back to Home
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}