'use client';

import { useState, useEffect } from 'react';

interface LikeData {
    essayId: string;
    count: number;
}

interface Review {
    id: number;
    essay_id: string;
    review: string;
    generated_name: string;
    created_at: string;
}

interface ReviewsData {
    essayId: string;
    reviews: Review[];
}

interface LikesAndReviewsProps {
    essayId: string;
}

export default function LikesAndReviews({ essayId }: LikesAndReviewsProps) {
    const [anonId, setAnonId] = useState<string | null>(null);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLiking, setIsLiking] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const storageKey = 'mm_anon_id';
        let stored = window.localStorage.getItem(storageKey);
        if (!stored) {
            try {
                if (typeof window.crypto !== 'undefined' && 'randomUUID' in window.crypto) {
                    stored = window.crypto.randomUUID();
                } else {
                    stored = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
                }
                window.localStorage.setItem(storageKey, stored);
            } catch {
                stored = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
            }
        }
        setAnonId(stored);
    }, []);

    useEffect(() => {
        if (!essayId) return;

        const fetchLikes = async () => {
            try {
                const response = await fetch(`/api/essays/${essayId}/likes`);
                const data: LikeData = await response.json();
                setLikeCount(data.count);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/essays/${essayId}/reviews`);
                const data: ReviewsData = await response.json();
                setReviews(data.reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchLikes();
        fetchReviews();
    }, [essayId]);

    const handleLike = async () => {
        if (isLiking || !anonId) return;
        
        setIsLiking(true);
        try {
            const response = await fetch(`/api/essays/${essayId}/likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ anonId }),
            });
            const data: LikeData = await response.json();
            setLikeCount(data.count);
        } catch (error) {
            console.error('Error liking essay:', error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewText.trim() || isSubmittingReview || !anonId) return;

        setIsSubmittingReview(true);
        try {
            const response = await fetch(`/api/essays/${essayId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review: reviewText, anonId }),
            });

            if (response.ok) {
                const data = await response.json();
                setReviews([data.review, ...reviews]);
                setReviewText('');
                setShowReviewForm(false);
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - date.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                return 'Today';
            } else if (diffDays === 1) {
                return '1 day ago';
            } else if (diffDays < 7) {
                return `${diffDays} days ago`;
            } else {
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            }
        } catch {
            return '';
        }
    };

    return (
        <div className="py-10 border-t border-gray-200">
            <div className="mb-10">
                <button
                    onClick={handleLike}
                    disabled={isLiking}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <span className="font-medium">
                        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
                    </span>
                </button>
            </div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 font-heading">
                        Reviews ({reviews.length})
                    </h2>
                    <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="text-sm text-gray-600 hover:text-gray-900 font-inter transition-colors"
                    >
                        {showReviewForm ? 'Cancel' : 'Write a Review'}
                    </button>
                </div>

                {showReviewForm && (
                    <form onSubmit={handleSubmitReview} className="mb-8">
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Share your thoughts about this essay..."
                            rows={4}
                            maxLength={2000}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-inter resize-none"
                        />
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-sm text-gray-500 font-inter">
                                {reviewText.length}/2000 characters
                            </span>
                            <button
                                type="submit"
                                disabled={!reviewText.trim() || isSubmittingReview}
                                className="px-6 py-2 bg-gray-900 text-white text-sm font-inter hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                )}

                {reviews.length === 0 ? (
                    <p className="text-gray-500 font-inter">No reviews yet. Be the first to share your thoughts!</p>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gray-900 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                                        {review.generated_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900 font-inter">
                                                {review.generated_name}
                                            </span>
                                            <span className="text-gray-400 text-sm">·</span>
                                            <span className="text-sm text-gray-500 font-inter">
                                                {formatDate(review.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 font-inter leading-relaxed whitespace-pre-wrap">
                                            {review.review}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

