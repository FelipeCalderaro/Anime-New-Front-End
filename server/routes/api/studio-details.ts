
import axios from 'axios';
import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    if (!query.id) return { error: "No studio id provided" };

    const details = await scrapeProducerDetails(query.id as number);
    return { ...details };
});


async function scrapeProducerDetails(id: number) {
    try {
        const { data } = await axios.get(`https://myanimelist.net/anime/producer/${id}`, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        const $ = cheerio.load(data);

        // Extract producer name
        const name = $(".content-left .logo img").attr("alt") || "";

        // Extract logo URL
        const logo = $(".content-left .logo img").attr("data-src") || $(".content-left .logo img").attr("src") || "";

        // Extract description
        const description = $(".content-left .spaceit_pad").last().text().trim();

        // Extract additional details
        const japaneseName = $(".content-left .spaceit_pad:contains('Japanese:')").text().replace("Japanese:", "").trim();
        const established = $(".content-left .spaceit_pad:contains('Established:')").text().replace("Established:", "").trim();
        const favorites = $(".content-left .spaceit_pad:contains('Member Favorites:')").text().replace("Member Favorites:", "").trim();

        // Extract available links
        const links: string[] = [];
        $(".user-profile-sns a").each((_, el) => {
            links.push($(el).attr("href")?.trim() || "");
        });

        // Extract resources
        const resources: string[] = [];
        $(".pb16 a").each((_, el) => {
            resources.push($(el).attr("href")?.trim() || "");
        });

        return {
            name,
            logo,
            japaneseName,
            established,
            favorites,
            description,
            links,
            resources
        };
    } catch (error) {
        console.error("Scraping Error:", error);
        return null;
    }
}
