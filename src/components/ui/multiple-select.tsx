import CheckIcon from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import { Theme } from '@mui/material/styles'
import React from 'react'
import { Controller } from 'react-hook-form'

// Styled components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    minHeight: '36px',
    backgroundColor: theme.palette.background.default,
    '& fieldset': {
      borderColor: theme.palette.divider
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.primary
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`
    }
  },
  '& .MuiSelect-select': {
    paddingRight: '32px !important',
    minHeight: '36px !important',
    padding: '4px 8px !important'
  }
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '0px !important',
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    borderColor: 'transparent'
  },
  '&:focus': {
    backgroundColor: theme.palette.action.hover
  }
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  height: '24px',
  fontSize: theme.typography.body2.fontSize,
  backgroundColor: theme.palette.action.selected,
  '& .MuiChip-deleteIcon': {
    fontSize: '18px',
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary
    }
  }
}))

export interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  name: string
  control: any
  label?: string
  options: MultiSelectOption[]
  error?: string
  required?: boolean
  placeholder?: string
  helperText?: string
  maxHeight?: number
  disabled?: boolean
  size?: 'small' | 'medium'
  fullWidth?: boolean
  onChange?: (values: string[]) => void
}

const getMenuProps = (maxHeight: number, theme: Theme) => ({
  PaperProps: {
    style: {
      maxHeight: maxHeight,
      width: 250
    },
    sx: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    }
  },
  MenuListProps: {
    style: {
      padding: 0
    }
  }
})

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  control,
  label,
  options,
  error,
  required = false,
  placeholder,
  helperText,
  maxHeight = 300,
  disabled = false,
  size = 'medium',
  fullWidth = true,
  onChange
}) => {
  const theme = useTheme()
  const MenuProps = getMenuProps(maxHeight, theme)

  return (
    <StyledFormControl fullWidth={fullWidth} error={!!error} disabled={disabled} size={size}>
      {label && (
        <InputLabel id={`${name}-label`} required={required}>
          {label}
        </InputLabel>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field: { value, onChange: fieldOnChange, ...field } }) => (
          <Select
            {...field}
            value={Array.isArray(value) ? value : []}
            labelId={`${name}-label`}
            multiple
            input={<OutlinedInput label={label} />}
            placeholder={placeholder}
            displayEmpty
            IconComponent={ExpandMoreIcon}
            renderValue={(selected) => {
              const selectedArray = Array.isArray(selected) ? selected : []
              if (selectedArray.length === 0) {
                return <span style={{ color: theme.palette.text.secondary }}>{placeholder}</span>
              }
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedArray.map((value) => {
                    const option = options.find((opt) => opt.value === value)
                    return (
                      <StyledChip
                        key={value}
                        label={option?.label || value}
                        size='small'
                        onDelete={(e) => {
                          e.stopPropagation()
                          const newValue = selectedArray.filter((v) => v !== value)
                          fieldOnChange(newValue)
                          onChange?.(newValue)
                        }}
                      />
                    )
                  })}
                </Box>
              )
            }}
            onChange={(e) => {
              const newValue = e.target.value
              fieldOnChange(newValue)
              onChange?.(newValue as string[])
            }}
            MenuProps={MenuProps}
          >
            {options.map((option) => (
              <StyledMenuItem key={option.value} value={option.value}>
                {option.label}
                <CheckIcon
                  sx={{
                    ml: 'auto',
                    visibility: Array.isArray(value) && value.includes(option.value) ? 'visible' : 'hidden',
                    fontSize: '1rem'
                  }}
                />
              </StyledMenuItem>
            ))}
          </Select>
        )}
      />
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </StyledFormControl>
  )
}

export default MultiSelect
