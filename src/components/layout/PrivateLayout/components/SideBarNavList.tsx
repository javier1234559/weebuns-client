import List from '@mui/material/List'
import SideBarNavItem from './SideBarNavItem'
<<<<<<< Updated upstream
=======

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AppIconButton } from '~/components/common/AppIconButton'
>>>>>>> Stashed changes
import { LinkToPage } from '~/types/common'

interface Props {
  items: Array<LinkToPage>
  showIcons?: boolean
  mini?: boolean
  onClick?: React.MouseEventHandler
}

const SideBarNavList: React.FC<Props> = ({ items, showIcons, mini, onClick, ...restOfProps }) => {
  return (
    <List component='nav' {...restOfProps}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: mini ? 'center' : 'space-between', mb: 2 }}>
        <AppIconButton icon={'logo'} title='Logo'>
          {!mini && (
            <Typography variant='h6' marginLeft={2} fontWeight={600} color='textPrimary'>
              Weebuns
            </Typography>
          )}
        </AppIconButton>
      </Box>

      {items.map(({ icon, path, title }) => (
        <SideBarNavItem
          key={`${title}-${path}`}
          icon={showIcons ? icon : undefined}
          path={path}
          title={title}
          onClick={onClick}
          mini={mini}
        />
      ))}
    </List>
  )
}

export default SideBarNavList
