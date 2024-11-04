import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { X } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { AppImage } from '~/components/common/AppImage'
import AppInput from '~/components/common/AppInput'
import ContentEditor from '~/components/feature/Editor/ContentEditor'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { Select, SelectItem } from '~/components/ui/select'
import { useModal } from '~/contexts/ModalContext'
import { EssayFormData } from '~/features/essay/components/CreateEssayForm/CreateEssayForm'
import EssayUpdateStatusModal from '~/features/essay/modal/EssayStatusModal'
import { useEventSwitchDarkMode } from '~/hooks/event'
import { RouteNames } from '~/router/route-name'
import { RootState } from '~/store/store'

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Vietnamese' }
]

function ViewOnlyEssayForm() {
  const { id } = useParams<{ id: string }>()
  const { isDarkMode } = useEventSwitchDarkMode()
  const { openModal } = useModal()
  const essayData = useSelector<RootState, EssayFormData>((state) => state.essay.essayViewData)
  const navigator = useNavigate()

  const { control } = useForm<EssayFormData>({
    defaultValues: {
      ...essayData,
      hashtags: essayData?.hashtags || []
    }
  })

  const handleChangeStatus = () => {
    const currentStatus = 'public'
    const essayId = id
    openModal(EssayUpdateStatusModal, { essayId, currentStatus: currentStatus })
  }

  const handleCancel = () => {
    navigator(RouteNames.Essay)
  }

  const renderTitleAndLanguage = () => (
    <Box display='flex' gap={2}>
      <Box flexGrow={1}>
        <Controller
          name='title'
          disabled
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <AppInput {...field} fullWidth error={!!error} placeholder='Write a title' helperText={error?.message} />
            </Box>
          )}
        />
      </Box>
      <Box>
        <Controller
          disabled
          name='language'
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder='Select language'>
              {LANGUAGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </Box>
    </Box>
  )

  const renderContent = () => (
    <Controller
      name='content'
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <ContentEditor isDark={isDarkMode} content={field.value} onChangeContent={field.onChange} />
          {error && (
            <Typography color='error' variant='caption' sx={{ mt: 1 }}>
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  )

  console.log()
  const renderHashtags = () => (
    <Controller
      name='hashtags'
      control={control}
      render={({ field }) => (
        <Box my={2}>
          <Typography variant='h6' mb={1}>
            Hashtags
          </Typography>
          {(field.value || []).map((tag, index) => (
            <Chip
              key={index}
              disabled
              label={tag}
              variant='outlined'
              deleteIcon={<X size={14} />}
              onDelete={() => {
                const newTags = [...(field.value || [])]
                newTags.splice(index, 1)
                field.onChange(newTags)
              }}
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>
      )}
    />
  )

  return (
    <form id='essay-create-form'>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <CardTitle>View only Essay</CardTitle>
          {renderTitleAndLanguage()}
          {essayData.cover_url && (
            <AppImage
              sx={{ borderRadius: '8px', height: '100%', objectFit: 'cover', mb: 2 }}
              src={essayData.cover_url}
              alt={essayData.title}
            />
          )}
          {renderContent()}
          {renderHashtags()}
          <Box display='flex' justifyContent='flex-end' gap={1}>
            <AppButton type='button' variant='outlined' color='primary' onClick={handleCancel}>
              Cancel
            </AppButton>
            <AppButton type='button' variant='contained' color='primary' onClick={handleChangeStatus}>
              Change Status
            </AppButton>
          </Box>
        </CardContent>
      </Card>
    </form>
  )
}

export default React.memo(ViewOnlyEssayForm)
