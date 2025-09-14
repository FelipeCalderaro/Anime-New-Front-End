
import axios from 'axios';
import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    if (!query.name) return { error: "No studio name provided" };

    const studios = await scrapeStudio(query.name as string);
    return { results: studios };
});

async function scrapeStudio(studioName: string) {
    try {
        const searchUrl = `https://myanimelist.net/company?q=${encodeURIComponent(studioName)}`;

        const { data } = await axios.get(searchUrl, {
            headers: { "User-Agent": "Mozilla/5.0" } // Prevents bot detection
        });

        const $ = cheerio.load(data);
        const studios: { id: number; name: string; link: string }[] = [];

        $("table tbody tr").each((_, el) => {
            const linkElement = $(el).find("td.borderClass a").first();
            const href = linkElement.attr("href");

            if (href) {
                const match = href.match(/\/anime\/producer\/(\d+)\/(.+)/);
                if (match) {
                    const id = parseInt(match[1], 10);
                    let name = href.split('/')[href.split('/').length - 1];
                    name = name.replaceAll('_', ' ')
                    const link = `https://myanimelist.net${href}`;

                    studios.push({ id, name, link });
                }
            }
        });

        return studios;
    } catch (error) {
        console.error("Scraping Error:", error);
        return [];
    }
}
