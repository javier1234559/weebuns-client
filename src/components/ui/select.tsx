import CheckIcon from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SelectChangeEvent, styled } from '@mui/material'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect from '@mui/material/Select'
import * as React from 'react'

// Styled components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '36px',
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
    paddingRight: '32px !important'
  }
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    borderColor: 'transparent'
  },
  '&:focus': {
    backgroundColor: theme.palette.action.hover
  }
}))

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary
}))

// Component interfaces
interface SelectProps {
  children: React.ReactNode
  value: string
  name: string
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void
  label?: string
  placeholder?: string
}

interface SelectItemProps {
  children: React.ReactNode
  value: string
}

// Components
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, value, onChange, label, placeholder, ...props }, ref) => {
    return (
      <StyledFormControl fullWidth>
        {label && <InputLabel>{label}</InputLabel>}
        <MuiSelect
          ref={ref}
          value={value}
          onChange={onChange}
          displayEmpty
          IconComponent={ExpandMoreIcon}
          renderValue={value !== '' ? undefined : () => placeholder}
          label={label}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: '8px',
                // backgroundColor: 'background.default',
                color: 'text.primary'
              }
            }
          }}
          {...props}
        >
          {children}
        </MuiSelect>
      </StyledFormControl>
    )
  }
)
Select.displayName = 'Select'

const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(({ children, value, ...props }, ref) => {
  return (
    <StyledMenuItem ref={ref} value={value} {...props}>
      {children}
      <CheckIcon style={{ marginLeft: 'auto', visibility: 'hidden' }} />
    </StyledMenuItem>
  )
})

SelectItem.displayName = 'SelectItem'

const SelectItemGroup: React.FC<{ children: React.ReactNode; label: string }> = ({ children, label }) => {
  return (
    <React.Fragment>
      <StyledListSubheader>{label}</StyledListSubheader>
      {children}
    </React.Fragment>
  )
}

const SelectSeparator = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(1, 0)
}))

export { Select, SelectItem, SelectItemGroup, SelectSeparator }
