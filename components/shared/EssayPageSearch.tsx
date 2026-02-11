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

export default function EssayPageSearch({ tags }: EssayPageSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeTag = searchParams.get('tag');
    const initialSearch = searchParams.get('search') || '';

    const [query, setQuery] = useState(initialSearch);
    const debouncedQuery = useDebounce(query, 300);

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
                <div className="flex flex-wrap gap-2 justify-center">
                    {tags.map((tag) => {
                        const isActive = activeTag === tag;
                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => handleTagClick(tag)}
                                className={`px-3 py-1 text-sm font-inter border transition-colors ${
                                    isActive
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-900 hover:text-white'
                                }`}
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
    );
}


