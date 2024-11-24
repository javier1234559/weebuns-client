import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { Theme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { RouteNames } from '~/router/route-name'
import { Course } from '~/services/api/api-axios'
import { replacePathId } from '~/utils/replace-path'
import { textUtils } from '~/utils/text-utils'

interface CourseManageCardProps {
  data: Course
}

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}))

const TruncatedTypography = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  minHeight: '48px'
})

const CardImageWrapper = styled(CardMedia)(({ theme }) => ({
  position: 'relative',
  paddingTop: '56.25%',
  backgroundColor: theme.palette.grey[100],
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

const CreatorInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2)
}))

const CourseManageCard: React.FC<CourseManageCardProps> = ({ data }) => {
  const navigate = useNavigate()

  if (!data) {
    return null
  }

  const handleUpdateCourse = () => {
    navigate(replacePathId(RouteNames.AdminCourseManagerDetail, data.id))
  }

  return (
    <StyledCard>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardImageWrapper>{data.thumbnailUrl && <img src={data.thumbnailUrl} alt={data.title} />}</CardImageWrapper>

        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Box sx={{ mb: 'auto' }}>
            <Typography
              variant='h6'
              component='h2'
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: '1.125rem',
                lineHeight: 1.2
              }}
            >
              {data.title}
            </Typography>

            <TruncatedTypography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              {textUtils.truncate(textUtils.sanitize(data.description || ''), 1000)}
            </TruncatedTypography>
          </Box>

          {data.creator && (
            <CreatorInfo>
              <Avatar
                src={data.creator.profilePicture || ''}
                alt={data.creator.username}
                sx={{ width: 40, height: 40 }}
              >
                {data.creator.username?.[0]?.toUpperCase()}
              </Avatar>
              <Box sx={{ ml: 1.5 }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.2
                  }}
                >
                  {data.creator.username}
                </Typography>
                {data.creator.role && (
                  <Typography variant='caption' color='text.secondary' sx={{ display: 'block' }}>
                    {data.creator.role}
                  </Typography>
                )}
              </Box>
            </CreatorInfo>
          )}

          <AppButton
            fullWidth
            variant='outlined'
            color='primary'
            startIcon={<DriveFileRenameOutlineIcon />}
            onClick={handleUpdateCourse}
            sx={{
              height: 48,
              borderRadius: 24,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Update course
          </AppButton>
        </CardContent>
      </Box>
    </StyledCard>
  )
}

export default CourseManageCard
