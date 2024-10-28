import './AppInput.scss'

import { styled, TextFieldProps } from '@mui/material'
import TextField from '@mui/material/TextField'
import React from 'react'

const baseStyles = (theme: any) => ({
  '& .MuiInputBase-root': {
    height: '36px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    transition: theme.transitions.create(['border-color', 'outline']),
    '&:hover': {
      borderColor: theme.palette.text.primary
    }
  },
  '& .MuiInputBase-input': {
    padding: '4px 12px',
    fontSize: '0.875rem'
  },
  '& .MuiInputBase-root.Mui-disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
})

const OutlinedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '36px',
    border: `1px solid ${theme.palette.divider}`,

    '& fieldset': {
      border: 'none'
    },

    '&.Mui-focused': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '0px'
    }
  },

  '& .MuiOutlinedInput-input': {
    padding: '4px 12px',
    fontSize: '0.875rem'
  }

  // '& .MuiInputLabel-root': {
  //   position: 'absolute',
  //   left: '-9999px',
  //   width: '1px',
  //   height: '1px',
  //   overflow: 'hidden'
  // },

  // // Remove the notched outline
  // '& .MuiOutlinedInput-notchedOutline': {
  //   display: 'none'
  // }
}))

const FilledTextField = styled(TextField)(({ theme }) => ({
  ...baseStyles(theme),
  '& .MuiFilledInput-root': {
    backgroundColor: theme.palette.action.hover,
    '&:hover': {
      backgroundColor: theme.palette.action.selected
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.action.selected
    }
  }
}))

const StandardTextField = styled(TextField)(({ theme }) => ({
  ...baseStyles(theme),
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.palette.divider
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: theme.palette.text.primary
  }
}))

export type InputProps = Omit<TextFieldProps, 'variant'> & {
  variant?: 'outlined' | 'filled' | 'standard'
}

const AppInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type = 'text', variant = 'outlined', ...rest } = props

  const TextFieldComponent =
    variant === 'filled' ? FilledTextField : variant === 'standard' ? StandardTextField : OutlinedTextField

  return <TextFieldComponent className='AppInput' type={type} variant={variant} inputRef={ref} {...rest} />
})

AppInput.displayName = 'AppInput'

export default AppInput
