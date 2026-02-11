'use client';

import { useState } from 'react';

interface ShareButtonProps {
    essayId: string;
    title: string;
    author: string;
    category?: string;
    imageUrl?: string;
}

export default function ShareButton({ essayId, title, author, category, imageUrl }: ShareButtonProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const essayUrl = `${baseUrl}/essays/${essayId}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(essayUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            setShowMenu(false);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };

    const handleDownloadOGImage = () => {
        const params = new URLSearchParams({
            title: title,
            author: author,
        });
        if (category) {
            params.append('category', category);
        }
        if (imageUrl) {
            params.append('image', imageUrl);
        }
        const ogImageUrl = `${baseUrl}/api/og?${params.toString()}`;

        // Open in new tab for download
        window.open(ogImageUrl, '_blank');
        setShowMenu(false);
    };

    const handleDownloadStoryImage = () => {
        const params = new URLSearchParams({
            title: title,
            author: author,
            variant: 'story',
        });
        if (category) {
            params.append('category', category);
        }
        if (imageUrl) {
            params.append('image', imageUrl);
        }
        const storyImageUrl = `${baseUrl}/api/og?${params.toString()}`;

        // Open in new tab for download
        window.open(storyImageUrl, '_blank');
        setShowMenu(false);
    };

    const handleShareNative = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out this essay: ${title}`,
                    url: essayUrl,
                });
                setShowMenu(false);
            } catch (error) {
                // User cancelled or error occurred
                console.error('Error sharing:', error);
            }
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-inter transition-colors border border-gray-300 rounded-md hover:border-gray-400"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
                Share
            </button>

            {showMenu && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowMenu(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        <div className="py-1">
                            {typeof navigator !== 'undefined' && 'share' in navigator && (
                                <button
                                    onClick={handleShareNative}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-inter"
                                >
                                    Share via...
                                </button>
                            )}
                            <button
                                onClick={handleCopyLink}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-inter"
                            >
                                {copied ? '✓ Link copied!' : 'Copy link'}
                            </button>
                            <button
                                onClick={handleDownloadOGImage}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-inter"
                            >
                                Download share image (Twitter/WhatsApp)
                            </button>
                            <button
                                onClick={handleDownloadStoryImage}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-inter"
                            >
                                Download Instagram Story image
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

