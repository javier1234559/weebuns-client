import List from '@mui/material/List'

import { LinkToPage } from '~/types/common'

import SideBarNavItem from './SideBarNavItem'

interface Props {
  items: Array<LinkToPage>
  showIcons?: boolean
  mini?: boolean
  onClick?: React.MouseEventHandler
}

const SideBarNavList: React.FC<Props> = ({ items, showIcons, mini, onClick, ...restOfProps }) => {
  return (
    <List component='nav' {...restOfProps}>
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
