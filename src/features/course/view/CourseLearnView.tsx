import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { styled, useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { ClipboardList, X } from 'lucide-react'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import CourseIntroduction from '~/features/course/components/CourseIntroduction'
import { useContentNavigation } from '~/features/course/hooks/useContentNavigation'
import { useCourseLearn } from '~/features/course/hooks/useCourseQueries'
import { useSetupCourseProgress } from '~/features/course/hooks/useSetupCourseProgress'
import UnitSidebar from '~/features/unit/components/UnitSideBar'
import UnitDetailLearnView from '~/features/unit/views/UnitDetailLearnView'

const DRAWER_WIDTH = 320

const SidebarWrapper = styled(Paper)(({ theme }) => ({
  width: DRAWER_WIDTH,
  borderRight: `1px solid ${theme.palette.divider}`,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto'
}))

const MainContentWrapper = styled(Box)(() => ({
  flex: 1,
  minHeight: '100%',
  width: '100%'
}))

const CourseContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '24px',
  marginTop: '24px',
  width: '100%',
  flex: 1,
  maxWidth: 'calc(100% - 48px)'
}))

const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.drawer + 1
}))

const CourseLearnView = () => {
  useContentNavigation()
  const [searchParams] = useSearchParams()
  const { id } = useParams<{ id: string }>()
  const unitId = searchParams.get('unitId')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const { data, isLoading, error } = useCourseLearn(id || '')
  useSetupCourseProgress({ courseId: id || '' })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const sidebarContent = (
    <SidebarWrapper elevation={0}>
      <UnitSidebar units={data?.course.units || []} />
    </SidebarWrapper>
  )

  if (isLoading) return <AppLoading />
  if (!data || error) return <AppError message={error?.message || 'No data found'} />

  return (
    <CourseContainer>
      {isMobile ? (
        <>
          <Drawer
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better mobile performance
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH
              }
            }}
          >
            {sidebarContent}
          </Drawer>
          <Tooltip title={mobileOpen ? 'Close menu' : 'Open menu'} placement='left'>
            <MenuButton onClick={handleDrawerToggle} color='primary' className='shadow-lg'>
              {mobileOpen ? <X size={28} /> : <ClipboardList size={28} />}
            </MenuButton>
          </Tooltip>
        </>
      ) : (
        sidebarContent
      )}

      <MainContentWrapper>
        <Box>{unitId ? <UnitDetailLearnView unitId={unitId} /> : <CourseIntroduction data={data.course} />}</Box>
      </MainContentWrapper>
    </CourseContainer>
  )
}

export default CourseLearnView
