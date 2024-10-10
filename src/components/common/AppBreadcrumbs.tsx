import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { ChevronLeft } from 'lucide-react'
import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface AppBreadcrumbProps {
  breadcrumb: { title: string; href?: string }[]
  isHiddenBack?: boolean
  className?: string
}

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-li': {
    '& a': {
      color: theme.palette.text.secondary,
      textDecoration: 'none',
      fontSize: '0.875rem',
      '&:hover': {
        color: theme.palette.text.primary
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1rem'
      }
    },
    '& span': {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '1rem'
      }
    }
  }
}))

function AppBreadcrumb({ breadcrumb, isHiddenBack, className }: AppBreadcrumbProps) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Box className={className} sx={{ mb: 2, display: 'grid', gridColumn: 'full' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <StyledBreadcrumbs separator='/'>
          {breadcrumb.map((item) => (
            <Typography key={`${item.title}-${item.href}`} component={item.href ? Link : 'span'} to={item.href}>
              {item.title}
            </Typography>
          ))}
        </StyledBreadcrumbs>
        {!isHiddenBack && (
          <Button variant='black' size='small' startIcon={<ChevronLeft />} onClick={handleGoBack}>
            <Box component='span' sx={{ display: { xs: 'none', lg: 'inline' } }}>
              {'Back'}
            </Box>
          </Button>
        )}
      </Box>
    </Box>
  )
}
AppBreadcrumb.displayName = 'AppBreadcrumb'

export default memo(AppBreadcrumb)
