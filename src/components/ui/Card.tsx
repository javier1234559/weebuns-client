import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React from 'react'

// Styled components
const StyledCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper
}))

const StyledCardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const StyledCardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3)
}))

const StyledCardFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`
}))

// Component interfaces
interface CardProps extends React.ComponentProps<typeof Paper> {
  children: React.ReactNode
}

interface CardHeaderProps extends React.ComponentProps<typeof Box> {
  children: React.ReactNode
}

interface CardTitleProps extends React.ComponentProps<typeof Typography> {
  children: React.ReactNode
}

interface CardDescriptionProps extends React.ComponentProps<typeof Typography> {
  children: React.ReactNode
}

interface CardContentProps extends React.ComponentProps<typeof Box> {
  children: React.ReactNode
}

interface CardFooterProps extends React.ComponentProps<typeof Box> {
  children: React.ReactNode
}

// Components
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, ...props }, ref) => (
  <StyledCard ref={ref} {...props}>
    {children}
  </StyledCard>
))
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ children, ...props }, ref) => (
  <StyledCardHeader ref={ref} {...props}>
    {children}
  </StyledCardHeader>
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ children, ...props }, ref) => (
  <Typography ref={ref} variant='h6' component='h3' {...props}>
    {children}
  </Typography>
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, ...props }, ref) => (
    <Typography ref={ref} variant='body2' color='text.secondary' {...props}>
      {children}
    </Typography>
  )
)
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ children, ...props }, ref) => (
  <StyledCardContent ref={ref} {...props}>
    {children}
  </StyledCardContent>
))
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ children, ...props }, ref) => (
  <StyledCardFooter ref={ref} {...props}>
    {children}
  </StyledCardFooter>
))
CardFooter.displayName = 'CardFooter'
