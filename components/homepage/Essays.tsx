import { getEssays } from "@/lib/contentful";
import { EssayCard } from "../shared/EssayCard";
import Link from "next/link";




const Essays = async () => {
    const essays = await getEssays();

    if (essays.length === 0) {
        return (
            <section id="essays" className="py-12 bg-newspaper-white border-t-4 border-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-newspaper font-black text-black mb-4">
                        ESSAYS & REFLECTIONS
                    </h2>
                    <p className="text-lg text-newspaper-gray font-newspaper italic">
                        Opinion columns and weekly thoughts from the editor&apos;s desk
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>
            </section>
        );
    }

    return (
        <section id="essays" className="py-12 bg-newspaper-white border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-newspaper font-black text-black mb-4">
                        ESSAYS & REFLECTIONS
                    </h2>
                    <p className="text-lg text-newspaper-gray font-newspaper italic">
                        Opinion columns and weekly thoughts from the editor&apos;s desk
                    </p>
                    <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {essays.map((essay) => (
                        <EssayCard key={String(essay.id)} essay={essay} />
                    ))}
                </div>

                <div className="mt-12 text-center bg-gray-100 p-8 border-2 border-black">
                    <h3 className="text-2xl font-newspaper font-bold text-black mb-4">
                        Have Thoughts to Share?
                    </h3>
                    <p className="text-newspaper-gray font-newspaper mb-6">
                        I love discussing backend architecture, team culture, and engineering challenges.
                        If you have ideas, questions, or just want to chat about code, let&apos;s connect.
                    </p>
                    <Link
                        href="/essays"
                        className="inline-block bg-accent-red text-white px-8 py-3 text-lg font-newspaper-sans hover:bg-red-700 transition-colors duration-200 border-2 border-accent-red"
                    >
                        Read More Essays
                    </Link>
                    <Link
                        href="mailto:mumbamarkian@gmail.com"
                        className="inline-block bg-accent-red text-white px-8 py-3 text-lg font-newspaper-sans hover:bg-red-700 transition-colors duration-200 border-2 border-accent-red"
                    >
                        Reach Out
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Essays;