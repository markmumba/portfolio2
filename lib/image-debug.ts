// Image debugging utility for production troubleshooting
export function debugImageUrl(url: string, context: string = '') {
    if (typeof window !== 'undefined') {
        console.group(`🖼️ Image Debug ${context ? `- ${context}` : ''}`);
        console.log('Original URL:', url);

        // Test if image can be loaded
        const img = new Image();
        img.onload = () => {
            console.log('✅ Image loaded successfully');
            console.log('Natural dimensions:', `${img.naturalWidth}x${img.naturalHeight}`);
        };
        img.onerror = (error) => {
            console.error('❌ Image failed to load:', error);
            console.log('Failed URL:', url);
        };
        img.src = url;

        console.groupEnd();
    }
}

// Screen size debugging
export function debugScreenSize() {
    if (typeof window !== 'undefined') {
        console.group('📱 Screen Debug');
        console.log('Window dimensions:', `${window.innerWidth}x${window.innerHeight}`);
        console.log('Screen dimensions:', `${window.screen.width}x${window.screen.height}`);
        console.log('Device pixel ratio:', window.devicePixelRatio);
        console.log('User agent:', navigator.userAgent);
        console.groupEnd();
    }
}

// Network debugging
export function debugNetwork() {
    if (typeof window !== 'undefined' && 'navigator' in window) {
        console.group('🌐 Network Debug');
        // @ts-expect-error - connection is experimental
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            console.log('Connection type:', connection.effectiveType);
            console.log('Downlink speed:', connection.downlink + ' Mbps');
            console.log('RTT:', connection.rtt + ' ms');
        } else {
            console.log('Network API not available');
        }
        console.groupEnd();
    }
}
