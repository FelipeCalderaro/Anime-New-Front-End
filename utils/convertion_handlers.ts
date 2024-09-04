import { MediaRelation, MediaSeason, MediaStatus } from "#gql/default"

export function relationTypeTranslation(relation?: MediaRelation | null): string {
    switch (relation) {
        case MediaRelation.ADAPTATION:
            return 'Adaptação';
        case MediaRelation.ALTERNATIVE:
            return 'Alternativa';
        case MediaRelation.CHARACTER:
            return 'Personagem';
        case MediaRelation.COMPILATION:
            return 'Compilação';
        case MediaRelation.CONTAINS:
            return 'Contém';
        case MediaRelation.OTHER:
            return 'Outro';
        case MediaRelation.PARENT:
            return 'Original';
        case MediaRelation.PREQUEL:
            return 'Prelúdio';
        case MediaRelation.SEQUEL:
            return 'Sequência';
        case MediaRelation.SIDE_STORY:
            return 'História paralela';
        case MediaRelation.SOURCE:
            return 'Fonte';
        case MediaRelation.SPIN_OFF:
            return 'Derivada';
        case MediaRelation.SUMMARY:
            return 'Resumo';
        default:
            return 'Desconhecido';
    }
}

export function translateMediaStatus(status?: MediaStatus | null): string {
    switch (status) {
        case MediaStatus.CANCELLED:
            return 'Cancelado';
        case MediaStatus.FINISHED:
            return 'Finalizado';
        case MediaStatus.HIATUS:
            return 'Em Hiato';
        case MediaStatus.NOT_YET_RELEASED:
            return 'Ainda Não Lançado';
        case MediaStatus.RELEASING:
            return 'Em Lançamento';
        default:
            return 'Desconhecido';
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
