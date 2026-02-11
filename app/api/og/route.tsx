import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Helper to truncate text to fit
function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || 'Essay';
        const author = searchParams.get('author') || 'Markian Mumba';
        const category = searchParams.get('category') || '';
        const image = searchParams.get('image') || '';
        const variant = searchParams.get('variant') || 'og'; // 'og' or 'story'

        // Determine dimensions based on variant
        const isStory = variant === 'story';
        const width = isStory ? 1080 : 1200;
        const height = isStory ? 1920 : 630;

        // Truncate title based on variant
        const maxTitleLength = isStory ? 60 : 80;
        const displayTitle = truncateText(title, maxTitleLength);

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: isStory ? 'flex-end' : 'center',
                        padding: isStory ? '140px 80px' : '80px 100px',
                        backgroundColor: '#000000',
                        backgroundImage: image
                            ? `linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.90) 100%), url(${image})`
                            : 'linear-gradient(180deg, #020617 0%, #020617 100%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        color: '#ffffff',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: isStory ? '40px' : '32px',
                        }}
                    >
                        {category && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: isStory ? '24px' : '18px',
                                    color: '#e5e7eb',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontWeight: 500,
                                }}
                            >
                                {category}
                            </div>
                        )}

                        <h1
                            style={{
                                fontSize: isStory ? '72px' : '64px',
                                fontWeight: 700,
                                color: '#f9fafb',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                margin: 0,
                                fontFamily: 'Georgia, serif',
                            }}
                        >
                            {displayTitle}
                        </h1>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: isStory ? '16px' : '12px',
                                marginTop: isStory ? '20px' : '16px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontSize: isStory ? '28px' : '20px',
                                    color: '#f9fafb',
                                    fontWeight: 500,
                                }}
                            >
                                <div
                                    style={{
                                        width: isStory ? '48px' : '40px',
                                        height: isStory ? '48px' : '40px',
                                        borderRadius: '50%',
                                        background: '#171717',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: isStory ? '20px' : '18px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {author.charAt(0).toUpperCase()}
                                </div>
                                <span>{author}</span>
                            </div>

                            {/* Domain */}
                            <div
                                style={{
                                    fontSize: isStory ? '24px' : '18px',
                                    color: '#e5e7eb',
                                    fontWeight: 400,
                                }}
                            >
                                markian.fit
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: '#171717',
                        }}
                    />
                </div>
            ),
            {
                width,
                height,
            }
        );
    } catch (error) {
        console.error('Error generating OG image:', error);
        // Return a simple error image
                return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#ffffff',
                        color: '#171717',
                        fontSize: '32px',
                    }}
                >
                    markian.fit
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }
}

