import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { memo } from 'react'
import { useSelector } from 'react-redux'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import CompleteProgressButton from '~/features/course/components/CompleteProgressButton'
import LessonContentViewer from '~/features/lesson/components/LessonContentViewer'
import { LessonContent } from '~/features/lesson/lesson.type'
import UnitNote from '~/features/unit/components/UnitNote'
import { useLearnLesson } from '~/features/unit/hooks/useUnitQueries'
import { RootState } from '~/store/store'

interface UnitDetailLearnViewProps {
  unitId: string
  lessonId: string
}

const UnitDetailLearnView = ({ unitId, lessonId }: UnitDetailLearnViewProps) => {
  const { data, isLoading, error } = useLearnLesson(unitId, lessonId)
  const currentCourseProgress = useSelector((state: RootState) => state.course.currentCourseProgress)

  if (isLoading) return <AppLoading />
  if (!data || error) return <AppError error={error} />

  return (
    <Box>
      {/* Unit Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          {data.lesson.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: data.lesson.summary || '' }}></div>
      </Box>

      {/* Content Tabs */}
      <Box sx={{ mb: 4 }}>
        <LessonContentViewer content={data.lesson.content as LessonContent} />
        {/* <UnitContentTab contents={data.lesson.contents || []} /> */}
      </Box>

      {/* Progress Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <CompleteProgressButton
          lesson={data.lesson}
          nextLesson={currentCourseProgress.nextLesson}
          nextUnit={currentCourseProgress.nextUnit}
          isLastLesson={false}
        />
      </Paper>

      {/* Notes Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' gutterBottom>
          Notes
        </Typography>
        <UnitNote unitId={unitId} lessonId={lessonId} />
      </Paper>

      {/* Comments Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          Comments
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Comments will appear here...
        </Typography>
      </Paper>
    </Box>
  )
}

UnitDetailLearnView.displayName = 'UnitDetailLearnView'
export default memo(UnitDetailLearnView)
