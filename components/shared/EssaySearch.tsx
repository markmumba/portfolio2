"use client";

import { useState, useMemo } from "react";
import type { Essays } from "@/lib/definition";
import { EssayCard } from "./EssayCard";

const extractText = (richText: unknown): string => {
    if (typeof richText === 'string') {
        return richText;
    }
    if (richText && typeof richText === 'object' && 'content' in richText) {
        const richTextObj = richText as { content?: Array<{ content?: Array<{ value?: string }> }> };
        const content = richTextObj.content?.[0]?.content?.[0]?.value;
        return content || '';
    }
    return '';
};

interface EssaySearchProps {
    essays: Essays[];
}

export function EssaySearch({ essays }: EssaySearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags from essays
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        essays.forEach(essay => {
            if (essay.tags && Array.isArray(essay.tags)) {
                essay.tags.forEach(tag => tagSet.add(tag));
            }
        });
        return Array.from(tagSet).sort();
    }, [essays]);

    // Filter essays based on search query and selected tag
    const filteredEssays = useMemo(() => {
        return essays.filter(essay => {
            const title = extractText(essay.title).toLowerCase();
            const tags = essay.tags || [];
            const query = searchQuery.toLowerCase().trim();

            // Check if matches search query (title or tags)
            const matchesSearch = !query ||
                title.includes(query) ||
                tags.some(tag => tag.toLowerCase().includes(query));

            // Check if matches selected tag
            const matchesTag = !selectedTag || tags.includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [essays, searchQuery, selectedTag]);

    return (
        <div>
            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative max-w-xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow font-inter text-base"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
                <div className="mb-10">
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-2 text-sm font-inter transition-colors border ${
                                selectedTag === null
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`px-4 py-2 text-sm font-inter transition-colors border ${
                                    selectedTag === tag
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Results Count */}
            {(searchQuery || selectedTag) && (
                <p className="text-center text-gray-500 font-inter text-sm mb-8">
                    {filteredEssays.length} {filteredEssays.length === 1 ? 'article' : 'articles'} found
                    {selectedTag && <span> in <span className="font-medium">{selectedTag}</span></span>}
                    {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
                </p>
            )}

            {/* Essays List */}
            {filteredEssays.length > 0 ? (
                <div className="space-y-0 divide-y divide-gray-100">
                    {filteredEssays.map((essay) => (
                        <EssayCard key={String(essay.id)} essay={essay} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2 font-heading">
                        No articles found
                    </h3>
                    <p className="text-gray-500 font-inter">
                        Try adjusting your search or filters
                    </p>
                    {(searchQuery || selectedTag) && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedTag(null);
                            }}
                            className="mt-4 text-gray-900 underline font-inter text-sm hover:no-underline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
