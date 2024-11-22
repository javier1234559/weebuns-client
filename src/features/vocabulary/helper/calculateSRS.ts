import { RepetitionLevel } from '~/features/vocabulary/vocab.type'
import dayjs from '~/utils/format-date'

const calculateNextReview = (level: RepetitionLevel): string => {
  const REVIEW_INTERVALS = {
    [RepetitionLevel.NEW]: 0,
    [RepetitionLevel.LEVEL_1]: 1,
    [RepetitionLevel.LEVEL_2]: 3,
    [RepetitionLevel.LEVEL_3]: 7,
    [RepetitionLevel.LEVEL_4]: 14,
    [RepetitionLevel.LEVEL_5]: 30,
    [RepetitionLevel.MASTERED]: 90
  } as const
  return dayjs().add(REVIEW_INTERVALS[level], 'day').startOf('day').toISOString()
}

export default calculateNextReview
