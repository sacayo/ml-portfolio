import { useEffect } from 'react';

export function trackEvent(eventType: string, eventLabel?: string) {
    if (typeof window === 'undefined') return;

    try {
        const url = new URL(window.location.href);
        const params = new URLSearchParams();

        params.set('event', eventType);
        if (eventLabel) params.set('event_label', eventLabel);

        // Pass current path so backend knows where event happened
        params.set('path', window.location.pathname);

        // Forward current UTM params if they exist in the window URL
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
            .forEach((key) => {
                const value = url.searchParams.get(key);
                if (value) params.set(key, value);
            });

        // Dynamically handle any other tags as sources (e.g., ?linkedin, ?resume, ?twitter)
        url.searchParams.forEach((_, key) => {
            // If it's not a standard param we already handled or a system param
            if (!params.has(key) && key !== 'event' && key !== 'event_label' && key !== 'path') {
                // If the param has no value (like ?linkedin instead of ?source=linkedin), treat the key as the source
                if (url.searchParams.get(key) === '') {
                    params.set('utm_source', key);
                }
            }
        });

        const trackingUrl = `/api/track?${params.toString()}`;

        // Use sendBeacon if available for reliability during navigation/unload
        if (navigator.sendBeacon) {
            navigator.sendBeacon(trackingUrl);
        } else {
            fetch(trackingUrl, { method: 'GET', keepalive: true }).catch(() => { });
        }
    } catch (e) {
        // console.error(e); // Silent fail for analytics
    }
}

// Hook to track page views on mount/route change
export function useAnalytics() {
    useEffect(() => {
        // Logic to track page view. 
        // In Next.js App Router, this runs on mount of the component using it.
        // For global tracking, put in a Client Component inside Layout.
        trackEvent('page_view');
    }, []);
}
