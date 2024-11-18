import { yupResolver } from '@hookform/resolvers/yup'
import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import AppButton from '~/components/common/AppButton'
import MultiSelect from '~/components/ui/multiple-select'
import { Select, SelectItem } from '~/components/ui/select'
import {
  LANGUAGE_LABELS,
  LEVEL_LABELS,
  LEVEL_RANGE,
  TARGET_LABELS,
  TOPIC_LABELS
} from '~/features/space/space.constants'
import { LevelCode } from '~/services/graphql/graphql'

interface MegaFilterCourseProps {
  params: {
    language: string
    minLevel: string
    maxLevel: string
    topics: string[]
    courseType: string
  }
  setParam: (key: string, value: string | null) => void
}

const filterSchema = yup.object({
  language: yup.string().optional(),
  minLevel: yup.number().required(),
  maxLevel: yup.number().required(),
  topics: yup.array().of(yup.string()).optional(),
  courseType: yup.string().optional()
})

type FilterFormData = yup.InferType<typeof filterSchema>

const MegaFilterCourse = ({ params, setParam }: MegaFilterCourseProps) => {
  const [open, setOpen] = useState(false)
  const { control, reset, handleSubmit, setValue, watch } = useForm<FilterFormData>({
    resolver: yupResolver(filterSchema),
    defaultValues: {
      language: params.language,
      minLevel: LEVEL_RANGE[params.minLevel as LevelCode] || 0,
      maxLevel: LEVEL_RANGE[params.maxLevel as LevelCode] || 5,
      topics: params.topics,
      courseType: params.courseType
    }
  })

  const handleLevelChange = (_event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue('minLevel', value[0])
      setValue('maxLevel', value[1])
    }
  }

  const onSubmit = (data: FilterFormData) => {
    if (data.language) setParam('language', data.language)
    if (data.topics) setParam('topics', data.topics.join(','))
    if (data.courseType) setParam('courseType', data.courseType)

    // validate if minLevelCode and maxLevelCode are valid
    if (data.minLevel === data.maxLevel || data.minLevel == 0 || data.maxLevel == 5) {
      setParam('minLevel', null)
      setParam('maxLevel', null)
      setOpen(false)
      return
    }

    const minLevelCode = Object.entries(LEVEL_RANGE).find(([_, index]) => index === data.minLevel)?.[0]
    const maxLevelCode = Object.entries(LEVEL_RANGE).find(([_, index]) => index === data.maxLevel)?.[0]

    if (minLevelCode && maxLevelCode) {
      setParam('minLevel', minLevelCode)
      setParam('maxLevel', maxLevelCode)
    }

    setOpen(false)
  }

  const handleClear = () => {
    reset()
    setParam('language', null)
    setParam('minLevel', null)
    setParam('maxLevel', null)
    setParam('topics', null)
    setParam('courseType', null)
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)} color='primary'>
        <FilterListIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth='md' fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Typography variant='h4'>Filter Course</Typography>
            <Typography variant='subtitle2'>
              Filter courses by language, level, target, and topics and course type
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <Select
                  name='language'
                  value={watch('language') || ''}
                  onChange={(e) => setValue('language', e.target.value)}
                  placeholder='Language'
                >
                  <SelectItem value=''>All Languages</SelectItem>
                  {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                sx={{
                  px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
                  pb: { xs: 5, sm: 6, md: 8 },
                  maxWidth: '100%',
                  '& .MuiSlider-markLabel': {
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                    whiteSpace: 'nowrap',
                    transform: 'rotate(-45deg) translateX(-50%)',
                    transformOrigin: 'top left',
                    marginTop: 5
                  },
                  '& .MuiSlider-mark': {
                    height: '8px'
                  }
                }}
              >
                <Slider
                  value={[watch('minLevel'), watch('maxLevel')]}
                  onChange={handleLevelChange}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => {
                    const level = Object.entries(LEVEL_RANGE).find(([_, index]) => index === value)?.[0]
                    return LEVEL_LABELS[level as LevelCode]
                  }}
                  marks={Object.entries(LEVEL_RANGE).map(([key, value]) => ({
                    value,
                    label: LEVEL_LABELS[key as LevelCode]
                  }))}
                  max={5}
                  step={1}
                />
              </Box>

              <FormControl fullWidth>
                <Select
                  name='courseType'
                  value={watch('courseType') || ''}
                  onChange={(e) => setValue('courseType', e.target.value)}
                  placeholder='Target'
                >
                  <SelectItem value=''>All Targets</SelectItem>
                  {Object.entries(TARGET_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </Select>
              </FormControl>

              <MultiSelect
                name='topics'
                control={control}
                options={Object.entries(TOPIC_LABELS).map(([value, label]) => ({
                  value,
                  label
                }))}
                placeholder='Select Topics'
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <AppButton variant='outlined' onClick={handleClear}>
              Clear
            </AppButton>
            <AppButton type='submit' variant='black'>
              Apply Filters
            </AppButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default MegaFilterCourse
