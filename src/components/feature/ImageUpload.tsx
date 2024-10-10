import Box from '@mui/material/Box'
import { memo, useState } from 'react'

import AppButton from '~/components/common/AppButton'

interface ImageUploadProps {
  value: File | null
  onChange: (file: File | null) => void
}

function ImageUpload({ onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    onChange(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  return (
    <Box>
      {preview && <img src={preview} alt='Preview' style={{ maxWidth: '100%', marginBottom: 8 }} />}
      <input accept='image/*' style={{ display: 'none' }} id='raised-button-file' type='file' onChange={handleChange} />
      <label htmlFor='raised-button-file'>
        <AppButton variant='outlined' component='span'>
          Upload Image
        </AppButton>
      </label>
    </Box>
  )
}

export default memo(ImageUpload)
