import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import { CloudUpload, X } from 'lucide-react'
import React, { memo, useCallback, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import toast from 'react-hot-toast'

import uploadApi from '~/features/upload/services/uploadApi'
import { getCroppedImg } from '~/utils/upload'

interface AvatarUploadProps {
  value: string | null
  onChange: (url: string | null) => void
  size?: number
}

const AVATAR_SIZE = 100
const ASPECT_RATIO = 1

const UploadBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasImage'
})<{ hasImage: boolean; size: number }>(({ theme, hasImage, size }) => ({
  border: hasImage ? 'none' : `2px dashed ${theme.palette.text.primary}`,
  borderRadius: '50%',
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  width: size,
  height: size,
  '&:hover': {
    backgroundColor: hasImage ? 'transparent' : theme.palette.action.hover
  }
}))

const PreviewImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%'
})

const UploadContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled
}))

const HiddenInput = styled('input')({
  display: 'none'
})

const RemoveButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: -8,
  right: -8,
  minWidth: '24px',
  width: '24px',
  height: '24px',
  padding: 0,
  borderRadius: '50%',
  backgroundColor: theme.palette.error.light,
  color: theme.palette.common.white,
  zIndex: 10,
  '&:hover': {
    backgroundColor: theme.palette.error.dark
  }
}))

function AvatarUpload({ value, onChange, size = AVATAR_SIZE }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(value)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setIsDialogOpen(true)
      }
      reader.readAsDataURL(file)
    }
    // Clear input value
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleSave = useCallback(async () => {
    if (!preview || !croppedAreaPixels) return

    try {
      setIsUploading(true)
      const croppedImage = await getCroppedImg(preview, croppedAreaPixels, size, size)
      const file = new File([croppedImage], 'avatar.jpg', { type: 'image/jpeg' })

      const result = await uploadApi.uploadFile(file)
      const imageUrl = result.data.appUrl

      setPreview(imageUrl)
      onChange(imageUrl)
      setIsDialogOpen(false)
      toast.success('Avatar updated successfully')
    } catch (error) {
      console.error('Failed to crop/upload:', error)
      toast.error('Failed to update avatar')
    } finally {
      setIsUploading(false)
    }
  }, [preview, croppedAreaPixels, onChange, size])

  const handleRemove = useCallback(async () => {
    if (!value) return

    try {
      setIsUploading(true)
      const key = value.split('/').pop()
      if (key) {
        await uploadApi.deleteFile(key)
      }
      setPreview(null)
      onChange(null)
      toast.success('Avatar removed successfully')
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to remove avatar')
    } finally {
      setIsUploading(false)
    }
  }, [value, onChange])

  const handleRemoveClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    handleRemove()
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Box>
      <HiddenInput ref={fileInputRef} accept='image/*' type='file' onChange={handleChange} disabled={isUploading} />

      <label>
        <UploadBox hasImage={!!preview} size={size} onClick={handleClick}>
          {preview && (
            <>
              <PreviewImage src={preview} alt='Avatar' />
              <RemoveButton onClick={handleRemoveClick} disabled={isUploading}>
                <X size={14} />
              </RemoveButton>
            </>
          )}
          <UploadContent>{!preview && <CloudUpload size={24} />}</UploadContent>
        </UploadBox>
      </label>

      <Dialog open={isDialogOpen} maxWidth='sm' fullWidth>
        <DialogContent>
          <Box sx={{ position: 'relative', height: 400 }}>
            {preview && (
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={ASPECT_RATIO}
                cropShape='round'
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </Box>
          <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, zoom) => setZoom(Number(zoom))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary' disabled={isUploading}>
            {isUploading ? 'Processing...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default memo(AvatarUpload)
