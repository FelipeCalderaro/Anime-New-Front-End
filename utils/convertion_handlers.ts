// i18n-utils.ts
import { useI18n } from 'vue-i18n';

// Assuming you have imported your enums
import { CharacterRole, MediaFormat, MediaRelation, MediaSeason, MediaStatus } from '#gql/default';
import { All } from '~/types/Enums';

/**
 * Translates MediaRelation enum values to their i18n entries.
 * @param relation - The MediaRelation enum value.
 * @returns The translated string.
 */
export function translateMediaRelation(relation?: MediaRelation | null): string {
    const { t } = useI18n();
    switch (relation) {
        case MediaRelation.ADAPTATION:
            return t('relation.adaptation');
        case MediaRelation.ALTERNATIVE:
            return t('relation.alternative');
        case MediaRelation.CHARACTER:
            return t('relation.character');
        case MediaRelation.COMPILATION:
            return t('relation.compilation');
        case MediaRelation.CONTAINS:
            return t('relation.contains');
        case MediaRelation.OTHER:
            return t('relation.other');
        case MediaRelation.PARENT:
            return t('relation.parent');
        case MediaRelation.PREQUEL:
            return t('relation.prequel');
        case MediaRelation.SEQUEL:
            return t('relation.sequel');
        case MediaRelation.SIDE_STORY:
            return t('relation.side_story');
        case MediaRelation.SOURCE:
            return t('relation.source');
        case MediaRelation.SPIN_OFF:
            return t('relation.spin_off');
        case MediaRelation.SUMMARY:
            return t('relation.summary');
        default:
            return t('relation.unknown');
    }
}

/**
 * Translates Status enum values (MediaStatus + All) to their i18n entries.
 * @param status - The Status enum value.
 * @returns The translated string.
 */
export function translateMediaStatus(status?: MediaStatus | All | null): string {
    const { t } = useI18n();

    switch (status) {
        case All.ALL:
            return t('status.all');
        case All.OTHER:
            return t('status.other');
        case MediaStatus.CANCELLED:
            return t('status.cancelled');
        case MediaStatus.FINISHED:
            return t('status.finished');
        case MediaStatus.HIATUS:
            return t('status.hiatus');
        case MediaStatus.NOT_YET_RELEASED:
            return t('status.not_yet_released');
        case MediaStatus.RELEASING:
            return t('status.releasing');
        default:
            return t('status.unknown');
    }
}

/**
 * Translates MediaFormat or All enum values to their i18n entries.
 * @param format - The MediaFormat or All enum value.
 * @returns The translated string.
 */
export function translateMediaFormat(format?: MediaFormat | All | null): string {
    const { t } = useI18n();

    switch (format) {
        case All.ALL:
            return t('media.format.all');
        case All.OTHER:
            return t('media.format.other');
        case MediaFormat.MANGA:
            return t('media.format.manga');
        case MediaFormat.MOVIE:
            return t('media.format.movie');
        case MediaFormat.MUSIC:
            return t('media.format.music');
        case MediaFormat.NOVEL:
            return t('media.format.novel');
        case MediaFormat.ONA:
            return t('media.format.ona');
        case MediaFormat.ONE_SHOT:
            return t('media.format.one_shot');
        case MediaFormat.OVA:
            return t('media.format.ova');
        case MediaFormat.SPECIAL:
            return t('media.format.special');
        case MediaFormat.TV:
            return t('media.format.tv');
        case MediaFormat.TV_SHORT:
            return t('media.format.tv_short');
        default:
            return t('media.format.unknown');
    }
}

/**
 * Translates CharacterRole enum values to their i18n entries.
 * @param role - The CharacterRole enum value.
 * @returns The translated string.
 */
export function translateCharacterRole(role?: CharacterRole | null): string {
    const { t } = useI18n();
    switch (role) {
        case CharacterRole.BACKGROUND:
            return t('role.background');
        case CharacterRole.MAIN:
            return t('role.main');
        case CharacterRole.SUPPORTING:
            return t('role.supporting');
        default:
            return t('role.unknown');
    }
}

/**
 * Translates MediaSeason enum values to their i18n entries.
 * @param season - The MediaSeason enum value.
 * @returns The translated string.
 */
export function translateMediaSeason(season?: MediaSeason | null): string {
    const { t } = useI18n();
    switch (season) {
        case MediaSeason.WINTER:
            return t('season.winter');
        case MediaSeason.SPRING:
            return t('season.spring');
        case MediaSeason.SUMMER:
            return t('season.summer');
        case MediaSeason.FALL:
            return t('season.fall');
        default:
            return t('season.unknown');
    }
}


export function getCurrentSeason(): MediaSeason {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 2 && day >= 25) || month === 3 || month === 4 || month === 5) {
        return MediaSeason.SPRING;
    } else if ((month === 5 && day >= 25) || month === 6 || month === 7 || month === 8) {
        return MediaSeason.SUMMER;
    } else if ((month === 8 && day >= 25) || month === 9 || month === 10 || (month === 11 && day < 25)) {
        return MediaSeason.FALL;
    } else {
        return MediaSeason.WINTER;
    }
}


export function timeToAirDate(airingAt?: number): string | null {
    const { t, locale } = useI18n(); // Get i18n instance

    if (airingAt === null || airingAt === undefined) return '-';

    const airDate = new Date(airingAt * 1000); // Convert UNIX timestamp to milliseconds

    // Format the date based on locale
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long', // Full month name
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour format
    };

    // Get the formatted date string using toLocaleString
    const formattedDate = airDate.toLocaleString(locale.value, options);

    return formattedDate.replace(',', ''); // Remove comma for better readability
}