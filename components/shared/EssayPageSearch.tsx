'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface EssayPageSearchProps {
    tags: string[];
}

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

const VISIBLE_TAG_COUNT = 5;

export default function EssayPageSearch({ tags }: EssayPageSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeTag = searchParams.get('tag');
    const initialSearch = searchParams.get('search') || '';

    const [query, setQuery] = useState(initialSearch);
    const debouncedQuery = useDebounce(query, 300);
    const [tagsExpanded, setTagsExpanded] = useState(false);

    const visibleTags = tags.slice(0, VISIBLE_TAG_COUNT);
    const extraTags = tags.slice(VISIBLE_TAG_COUNT);
    const hasExtraTags = extraTags.length > 0;

    useEffect(() => {
        if (!activeTag || !hasExtraTags) return;
        const idx = tags.findIndex((t) => t === activeTag);
        if (idx >= VISIBLE_TAG_COUNT) {
            setTagsExpanded(true);
        }
    }, [activeTag, tags, hasExtraTags]);

    const updateURL = useCallback((search: string, tag: string | null) => {
        const params = new URLSearchParams();
        if (search.trim()) {
            params.set('search', search.trim());
        }
        if (tag) {
            params.set('tag', tag);
        }
        const queryString = params.toString();
        router.push(queryString ? `/essays?${queryString}` : '/essays');
    }, [router]);

    // Update URL when debounced search changes
    useEffect(() => {
        updateURL(debouncedQuery, activeTag);
    }, [debouncedQuery, activeTag, updateURL]);

    const handleTagClick = (tag: string) => {
        // Toggle: if clicking active tag, remove it; otherwise set it
        const newTag = activeTag === tag ? null : tag;
        updateURL(query, newTag);
    };

    const tagButtonClass = (isActive: boolean) =>
        `px-3 py-1 text-sm font-inter border transition-colors ${
            isActive
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-900 hover:text-white'
        }`;

    return (
        <div className="mb-10 max-w-[728px] mx-auto px-4 sm:px-6">
            <div className="mb-4">
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
                        placeholder="Search essays..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow font-inter text-base"
                    />
                </div>
            </div>

            {tags.length > 0 && (
                <div className="flex flex-col gap-3 items-stretch max-w-xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center items-center">
                        {visibleTags.map((tag) => {
                            const isActive = activeTag === tag;
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagClick(tag)}
                                    className={tagButtonClass(isActive)}
                                >
                                    {tag}
                                    {isActive && (
                                        <span className="ml-1.5 text-gray-400">&times;</span>
                                    )}
                                </button>
                            );
                        })}
                        {hasExtraTags && (
                            <button
                                type="button"
                                onClick={() => setTagsExpanded((v) => !v)}
                                aria-expanded={tagsExpanded}
                                className="px-3 py-1 text-sm font-inter border border-dashed border-gray-300 text-gray-600 bg-white hover:border-gray-900 hover:text-gray-900 transition-colors inline-flex items-center gap-1.5"
                            >
                                {tagsExpanded ? (
                                    <>
                                        Hide extra tags
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 15l7-7 7 7"
                                            />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        More tags
                                        <span className="text-gray-400">({extraTags.length})</span>
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {hasExtraTags && tagsExpanded && (
                        <div
                            className="flex flex-wrap gap-2 justify-center pt-1 border-t border-gray-100"
                            role="region"
                            aria-label="Additional essay tags"
                        >
                            {extraTags.map((tag) => {
                                const isActive = activeTag === tag;
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => handleTagClick(tag)}
                                        className={tagButtonClass(isActive)}
                                    >
                                        {tag}
                                        {isActive && (
                                            <span className="ml-1.5 text-gray-400">&times;</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


