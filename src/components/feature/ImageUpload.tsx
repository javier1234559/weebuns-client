import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { CloudUpload, X } from 'lucide-react'
import React, { memo, useCallback, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import toast from 'react-hot-toast'

import uploadApi from '~/features/upload/services/uploadApi'

interface UploadImageProps {
  value: string | null
  onChange: (url: string | null) => void
}

const BANNER_WIDTH = 1200
const BANNER_HEIGHT = 630
const ASPECT_RATIO = BANNER_WIDTH / BANNER_HEIGHT

const UploadBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasImage'
})<{ hasImage: boolean }>(({ theme, hasImage }) => ({
  border: hasImage ? 'none' : `2px dashed ${theme.palette.text.primary}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: hasImage ? 'transparent' : theme.palette.action.hover
  },
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: 0,
  paddingTop: `${(BANNER_HEIGHT / BANNER_WIDTH) * 100}%`
}))

const HiddenInput = styled('input')({
  display: 'none'
})

const PreviewImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
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
  zIndex: 1,
  color: theme.palette.text.disabled,
  transition: 'opacity 0.3s ease'
}))

const RemoveButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  minWidth: '32px',
  height: '32px',
  padding: theme.spacing(0.5),
  backgroundColor: theme.palette.error.light,
  color: theme.palette.common.white,
  zIndex: 10,
  '&:hover': {
    backgroundColor: theme.palette.error.dark
  }
}))

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = BANNER_WIDTH
  canvas.height = BANNER_HEIGHT
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Unable to create canvas context')
  }

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, BANNER_WIDTH, BANNER_HEIGHT)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
    }, 'image/jpeg')
  })
}

function UploadImage({ value, onChange }: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(value)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
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
  }

  const handleRemove = async (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (!value) return

    try {
      setIsUploading(true)
      // Extract key from URL
      const key = value.split('/').pop()
      console.log('Deleting key:', key)
      if (key) {
        await uploadApi.deleteFile(key)
      }
      setPreview(null)
      onChange(null)
      toast.success('Image removed successfully')
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to remove image')
    } finally {
      setIsUploading(false)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropConfirm = useCallback(async () => {
    if (preview && croppedAreaPixels) {
      try {
        setIsUploading(true)
        // First crop the image
        const croppedImage = await getCroppedImg(preview, croppedAreaPixels)
        const file = new File([croppedImage], 'cropped-banner.jpg', { type: 'image/jpeg' })

        // Then upload the cropped image
        const result = await uploadApi.uploadFile(file)

        // Update preview and form value
        const imageUrl = result.data.appUrl
        setPreview(imageUrl)
        onChange(imageUrl)

        setIsDialogOpen(false)
        toast.success('Image uploaded successfully')
      } catch (error) {
        console.error('Failed to crop/upload:', error)
        toast.error('Failed to process image')
      } finally {
        setIsUploading(false)
      }
    }
  }, [preview, croppedAreaPixels, onChange])

  const handleCancel = () => {
    setPreview(null)
    setIsDialogOpen(false)
  }

  return (
    <Box>
      <HiddenInput
        ref={fileInputRef}
        accept='image/*'
        id='blog-banner-upload'
        type='file'
        onChange={handleChange}
        disabled={isUploading}
      />
      <label htmlFor='blog-banner-upload'>
        <UploadBox hasImage={!!preview}>
          {preview && <PreviewImage src={preview} alt='Blog Banner Preview' />}
          <UploadContent>
            {preview ? (
              <RemoveButton onClick={handleRemove} variant='contained' color='secondary' disabled={isUploading}>
                <X size={24} />
              </RemoveButton>
            ) : (
              <>
                <CloudUpload size={40} style={{ marginBottom: 8 }} />
                <Typography variant='body1'>Upload Banner Image (Optional)</Typography>
                <Typography variant='caption'>
                  Recommended size: {BANNER_WIDTH}x{BANNER_HEIGHT}px
                </Typography>
              </>
            )}
          </UploadContent>
        </UploadBox>
      </label>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth='md' fullWidth>
        <DialogContent>
          <Box position='relative' height={400}>
            {preview && (
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={ASPECT_RATIO}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </Box>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            onChange={(_, zoom) => setZoom(Number(zoom))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleCropConfirm} color='primary' disabled={isUploading}>
            {isUploading ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default memo(UploadImage)
