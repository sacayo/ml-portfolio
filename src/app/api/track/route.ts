import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    return handleRequest(req);
}

export async function POST(req: NextRequest) {
    return handleRequest(req);
}

async function handleRequest(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;

        // Extract params
        const eventType = searchParams.get('event') || 'page_view';
        const eventLabel = searchParams.get('event_label');
        const utmSource = searchParams.get('utm_source');
        const utmMedium = searchParams.get('utm_medium');
        const utmCampaign = searchParams.get('utm_campaign');
        const utmTerm = searchParams.get('utm_term');
        const utmContent = searchParams.get('utm_content');

        // Get client info
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
        const userAgent = req.headers.get('user-agent');
        const referrer = req.headers.get('referer');

        // In a real app we would hash IP here. 
        // const ipHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip)); 
        // For this demo/code generation we'll just log it or simulate storing it.

        const payload = {
            timestamp: new Date().toISOString(),
            eventType,
            eventLabel,
            path: url.pathname, // This might be /api/track, usually we want the referrer path or passed as param
            // actually client should send the location.pathname as a param or we rely on referrer
            referrer,
            userAgent,
            ip, // Anonymize in production
            utm: {
                source: utmSource,
                medium: utmMedium,
                campaign: utmCampaign,
                term: utmTerm,
                content: utmContent,
            }
        };

        console.log('Analytics Event Received:', JSON.stringify(payload, null, 2));

        // HERE: Insert into Vercel Postgres or other DB.
        // await sql`INSERT INTO visits ...`

        // Return 1x1 pixel transparent gif if requested (common for tracking pixels) or just 200 OK JSON
        // For sendBeacon/fetch, a simple 200 is fine.
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Analytics Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
