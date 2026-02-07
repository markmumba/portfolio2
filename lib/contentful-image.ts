type ContentfulImageOptions = {
    width?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    fit?: 'fill' | 'thumb' | 'pad' | 'crop' | 'scale';
};

export function optimizeContentfulImageUrl(
    url: string,
    {
        width = 1600,
        quality = 80,
        format = 'webp',
        fit = 'fill',
    }: ContentfulImageOptions = {}
): string {
    try {
        const parsed = new URL(url);
        if (!parsed.hostname.includes('ctfassets.net')) {
            return url;
        }
        parsed.searchParams.set('w', String(width));
        parsed.searchParams.set('q', String(quality));
        parsed.searchParams.set('fm', format);
        parsed.searchParams.set('fit', fit);
        return parsed.toString();
    } catch {
        return url;
    }
}
