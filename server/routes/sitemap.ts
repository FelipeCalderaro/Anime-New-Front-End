import { MediaBySeasonQuery, MediaInfoQuery, MediaSeason } from '#gql/default';
import { promises as fs } from 'fs';
import { GqlError } from 'nuxt-graphql-client';
import { AsyncDataRequestStatus } from 'nuxt/app';
import { APP_CONFIGS } from '~/constants';
import { getCurrentSeason } from '~/utils/convertion_handlers';
import { slugify } from '~/utils/string_handlers';

const SITEMAP_FILE = './data/sitemap.json';

export default defineEventHandler(async (event) => {
    console.log("Sitemap handler triggered 🚀");
    const baseURL = APP_CONFIGS.cannonicalUrl;

    // Load previously saved sitemap data
    const savedRoutes = await loadSavedSitemap();

    // Fetch new media routes
    const mediaRoutes = await fetchMediaRoutes();

    // Merge old and new routes (avoid duplicates)
    const allMediaRoutes = mergeRoutes(savedRoutes, mediaRoutes);

    // Generate character and staff routes for each media route
    const dynamicRoutes = await generateCharacterStaffRoutes(allMediaRoutes);

    // Format sitemap XML
    const urls = [...allMediaRoutes, ...dynamicRoutes]
        .map((route) => `<url><loc>${baseURL}${route}</loc></url>`)
        .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
    </urlset>`;

    // Save updated sitemap data
    await saveSitemap(allMediaRoutes);

    event.node.res.setHeader('Content-Type', 'application/xml');
    return sitemap;
});

// Generate routes for characters and staff based on media
async function generateCharacterStaffRoutes(routes: string[]): Promise<string[]> {
    const allRoutes: string[] = [];

    for (const route of routes) {
        const [type, id, slug] = route.split('/').slice(1);
        if (!id) continue;
        // Fetch related characters and staff for the media ID and slug
        const characterRoutes = await fetchCharacterRoutes(parseInt(id));
        const staffRoutes = await fetchStaffRoutes(parseInt(id));

        allRoutes.push(...characterRoutes, ...staffRoutes);
    }

    return allRoutes;
}

// Load saved sitemap from JSON file
async function loadSavedSitemap(): Promise<string[]> {
    try {
        const data = await fs.readFile(SITEMAP_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Save sitemap data to JSON file
async function saveSitemap(routes: string[]) {
    await fs.writeFile(SITEMAP_FILE, JSON.stringify(routes, null, 2));
}

// Merge old and new routes (avoid duplicates)
function mergeRoutes(oldRoutes: string[], newRoutes: string[]): string[] {
    return Array.from(new Set([...oldRoutes, ...newRoutes]));
}

// Extract ID from the route
function extractIdFromRoute(route: string): number | null {
    const match = route.match(/\/(media)\/(\d+)/);
    return match ? parseInt(match[2]) : null;
}

// Fetch media routes
async function fetchMediaRoutes(): Promise<string[]> {
    const SEASONS: MediaSeason[] = [
        MediaSeason.WINTER,
        MediaSeason.SPRING,
        MediaSeason.SUMMER,
        MediaSeason.FALL,
    ];
    const season = getCurrentSeason();
    const currentDate = new Date();
    const currentSeasonIndex = SEASONS.findIndex((s) => s === season);
    const previousSeasonIndex =
        currentSeasonIndex - 1 < 0 ? SEASONS.length - 1 : currentSeasonIndex - 1;
    const previousSeason: MediaSeason = SEASONS[previousSeasonIndex];

    const data: MediaBySeasonQuery = await GqlMediaBySeason({
        season,
        previousSeason,
        currentDate: currentDate.getFullYear(),
    });
    //   return data.map((item: { id: number; slug: string }) => `/media/${item.id}/${item.slug}`);
    let medias = [];
    if (data.TV?.media) {
        medias.push(
            ...data.TV?.media?.map((i) => `/media/${i?.id}/${slugify(i?.title?.english || '')}`)
        )
    }
    if (data.LEFTOVERS?.media) {
        medias.push(
            ...data.LEFTOVERS?.media?.map((i) => `/media/${i?.id}/${slugify(i?.title?.english || '')}`)
        )
    }
    if (data.MOVIES?.media) {
        medias.push(
            ...data.MOVIES?.media?.map((i) => `/media/${i?.id}/${slugify(i?.title?.english || '')}`)
        )
    }
    if (data.SHORTS?.media) {
        medias.push(
            ...data.SHORTS?.media?.map((i) => `/media/${i?.id}/${slugify(i?.title?.english || '')}`)
        )
    }
    if (data.SPECIALS?.media) {
        medias.push(
            ...data.SPECIALS?.media?.map((i) => `/media/${i?.id}/${slugify(i?.title?.english || '')}`)
        )
    }
    return medias;
}

// Fetch characters for a given media
async function fetchCharacterRoutes(mediaId: number): Promise<string[]> {
    if (!mediaId) return [];
    const { data, error, status }: { data: MediaInfoQuery, error: GqlError, status: AsyncDataRequestStatus } = await GqlMediaInfo({
        id: mediaId,
    })
    return data.Media?.charactersPreview?.edges?.map((i) => `/character/${i?.id}/${slugify(i?.node?.name?.full || '')}`) || [];
}

// Fetch staff for a given media
async function fetchStaffRoutes(mediaId: number): Promise<string[]> {
    if (!mediaId) return [];
    const { data, error, status }: { data: MediaInfoQuery, error: GqlError, status: AsyncDataRequestStatus } = await GqlMediaInfo({
        id: mediaId,
    })
    return data.Media?.staffPreview?.edges?.map((i) => `/voice-actor/${i?.id}/${slugify(i?.node?.name?.full || '')}`) || [];
}
