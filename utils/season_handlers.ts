import { MediaSeason } from "#gql/default";

export interface SeasonsRowSelector {
    seasonName: string;
    seasonEnum: MediaSeason;
    seasonYear: number
}

const seasons: string[] = [
    "Inverno",
    "Outono",
    "Verão",
    "Primavera",
];

export function getYearBySeason(): SeasonsRowSelector[] {
    const currentSeason: MediaSeason = getCurrentSeason();
    const date = new Date();
    const year = date.getFullYear()

    switch (currentSeason) {
        case MediaSeason.SUMMER:
            return [
                { seasonName: seasons[0], seasonEnum: MediaSeason.WINTER, seasonYear: year + 1 },
                { seasonName: seasons[1], seasonEnum: MediaSeason.FALL, seasonYear: year },
                { seasonName: seasons[2], seasonEnum: MediaSeason.SUMMER, seasonYear: year },
                { seasonName: seasons[3], seasonEnum: MediaSeason.SPRING, seasonYear: year },
            ]
        case MediaSeason.FALL:
            return [
                { seasonName: seasons[0], seasonEnum: MediaSeason.WINTER, seasonYear: year + 1 },
                { seasonName: seasons[1], seasonEnum: MediaSeason.FALL, seasonYear: year + 1 },
                { seasonName: seasons[2], seasonEnum: MediaSeason.SUMMER, seasonYear: year },
                { seasonName: seasons[3], seasonEnum: MediaSeason.SPRING, seasonYear: year }
            ];
        default:
            return [
                { seasonName: seasons[0], seasonEnum: MediaSeason.WINTER, seasonYear: year },
                { seasonName: seasons[1], seasonEnum: MediaSeason.FALL, seasonYear: year },
                { seasonName: seasons[2], seasonEnum: MediaSeason.SUMMER, seasonYear: year },
                { seasonName: seasons[3], seasonEnum: MediaSeason.SPRING, seasonYear: year }
            ];
    }
}