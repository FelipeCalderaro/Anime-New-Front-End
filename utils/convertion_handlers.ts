import { MediaSeason } from "#gql/default"

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

export function timeToAirCountDown(airingAt?: number): string {
    if (airingAt === null) return '-'
    var now = new Date().getTime()
    var distance = (airingAt! * 1000) - now
    var days = Math.floor(distance / (1000 * 3600 * 24))
    var hours = Math.floor((distance % (1000 * 3600 * 24)) / (1000 * 3600))
    var minutes = Math.floor((distance % (1000 * 3600)) / (1000 * 60))

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
