import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export default dayjs

export const convertToRelativeTime = (date: string): string => {
  const now = dayjs()
  const targetDate = dayjs(date)

  if (!targetDate.isValid()) {
    return 'Invalid date'
  }

  const diffInSeconds = now.diff(targetDate, 'second')

  if (diffInSeconds < 60) {
    return 'Just now'
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }

  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }

  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months} month${months > 1 ? 's' : ''} ago`
  }

  const years = Math.floor(diffInSeconds / 31536000)
  return `${years} year${years > 1 ? 's' : ''} ago`
}
