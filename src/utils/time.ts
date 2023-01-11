import moment, { Moment } from 'moment'
import 'moment/min/locales'

export const isSystemTimeIncludesAmPm = (locale: string) => {
  const time = new Date().toLocaleString()
  return locale === 'en' && /(am|pm)$/i.test(time)
}

export const getTimeFormat = (locale: string) => (isSystemTimeIncludesAmPm(locale) ? 'hh:mm A' : 'HH:mm')

export function setMomentLocale(locale: string) {
  if (!locale) return

  moment.locale(locale)
}

export interface FormatDateTime {
  timestamp: string | number | Moment,
	locale?: string,
	showTime?: boolean
}

export const formatDateTime = ({
  timestamp,
	locale = 'ru',
	showTime = false
}: FormatDateTime): string => {
  if (!timestamp) return ''

  const timeFormat = getTimeFormat(locale)
  const localizedTimestamp = moment(timestamp).locale(locale)

  if (!localizedTimestamp.isValid()) return ''

  const now = moment()

  const today = now.clone().startOf('day')
  const yesterday = now.clone().subtract(1, 'days').startOf('day')
  const dayBeforeYesterday = now.clone().subtract(2, 'days').startOf('day')

  if (localizedTimestamp.isSame(today, 'd')) return localizedTimestamp.format(timeFormat)

  if (localizedTimestamp.isSame(yesterday, 'd')) {
    return localizedTimestamp.calendar()
  }

  if (localizedTimestamp.isSame(dayBeforeYesterday, 'd')) {
    return showTime ? localizedTimestamp.format(`dd, ${timeFormat}`) : localizedTimestamp.format('ddd')
  }

  if (localizedTimestamp.isSame(now, 'year')) {
    return showTime ? localizedTimestamp.format(`D MMMM, ${timeFormat}`) : localizedTimestamp.format('D MMMM')
  }

  if (localizedTimestamp.isBefore(dayBeforeYesterday, 'd')) {
    return showTime ? localizedTimestamp.format(`L, ${timeFormat}`) : localizedTimestamp.format('L')
  }

  return localizedTimestamp.format(`DD.MM.YY, ${timeFormat}`)
}
