import { getCurrentSeason } from "~/utils/convertion_handlers";
import { getYearBySeason } from "~/utils/season_handlers";

export default defineEventHandler(() => {
    var season = getCurrentSeason()
    var seasonYear = getYearBySeason(season)

    return {
        season: `Current season is: ${season}`,
        'expected season-year combination': seasonYear,
    };
});