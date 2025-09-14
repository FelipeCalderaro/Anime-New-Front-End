import { MediaSeason } from "#gql/default";

export interface SeasonsRowSelector {
    seasonEnum: MediaSeason;
    seasonYear: number
}

export function getYearBySeason(): SeasonsRowSelector[] {
    const currentSeason: MediaSeason = getCurrentSeason();
    const date = new Date();
    const year = date.getFullYear()

    switch (currentSeason) {
        case MediaSeason.SUMMER:
            return [
                { seasonEnum: MediaSeason.WINTER, seasonYear: year + 1 },
                { seasonEnum: MediaSeason.SPRING, seasonYear: year },
                { seasonEnum: MediaSeason.SUMMER, seasonYear: year },
                { seasonEnum: MediaSeason.FALL, seasonYear: year },
            ]
        case MediaSeason.FALL:
            return [
                { seasonEnum: MediaSeason.WINTER, seasonYear: year + 1 },
                { seasonEnum: MediaSeason.SPRING, seasonYear: year + 1 },
                { seasonEnum: MediaSeason.SUMMER, seasonYear: year },
                { seasonEnum: MediaSeason.FALL, seasonYear: year }
            ];
        case MediaSeason.WINTER:
            return [
                { seasonEnum: MediaSeason.WINTER, seasonYear: year },
                { seasonEnum: MediaSeason.SPRING, seasonYear: year },
                { seasonEnum: MediaSeason.SUMMER, seasonYear: year },
                { seasonEnum: MediaSeason.FALL, seasonYear: year - 1 }
            ]
        default:
            return [
                { seasonEnum: MediaSeason.WINTER, seasonYear: year },
                { seasonEnum: MediaSeason.SPRING, seasonYear: year },
                { seasonEnum: MediaSeason.SUMMER, seasonYear: year },
                { seasonEnum: MediaSeason.FALL, seasonYear: year }
            ];
    }
}