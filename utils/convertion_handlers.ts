// i18n-utils.ts
import { useI18n } from 'vue-i18n';

// Assuming you have imported your enums
import { MediaRelation, MediaStatus, MediaSeason, CharacterRole } from '#gql/default';

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
 * Translates MediaStatus enum values to their i18n entries.
 * @param status - The MediaStatus enum value.
 * @returns The translated string.
 */
export function translateMediaStatus(status?: MediaStatus | null): string {
    const { t } = useI18n();
    switch (status) {
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
    var SEASON = [
        MediaSeason.WINTER,
        MediaSeason.SPRING,
        MediaSeason.SUMMER,
        MediaSeason.FALL,
    ]
    var date = new Date()
    var month = date.getMonth()

    if (month >= 1 && month <= 3) {
        return SEASON[0]
    } else if (month >= 4 && month <= 6) {
        return SEASON[1]
    } else if (month >= 7 && month <= 9) {
        return SEASON[2]
    } else {
        return SEASON[3]
    }
}


export function timeToAirCountDown(airingAt?: number): string | null {
    if (airingAt === null) return '-'
    const now: number = new Date().getTime()
    const distance: number = (airingAt! * 1000) - now
    const days: number = Math.floor(distance / (1000 * 3600 * 24))
    const hours: number = Math.floor((distance % (1000 * 3600 * 24)) / (1000 * 3600))
    const minutes: number = Math.floor((distance % (1000 * 3600)) / (1000 * 60))
    if (Number.isNaN(days) || Number.isNaN(hours) || Number.isNaN(minutes)) {
        return '';
    }
    if (days < 1) {
        if (hours < 1) {
            return minutes + ' minutos'
        } else {
            return hours + ' horas ' + minutes + ' minutos'
        }
    } else {
        if (hours < 1) {
            return days + ' dias ' + minutes + ' minutos'
        } else {
            return days + ' dias ' + hours + ' horas ' + minutes + ' min'
        }
    }
}
