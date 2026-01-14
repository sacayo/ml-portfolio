'use client';

import { useAnalytics } from '@/lib/analytics';

export function AnalyticsProvider() {
    useAnalytics();
    return null;
}
