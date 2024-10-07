import { FunctionComponent } from 'react'

import { IconProps } from '../utils'

const LogoIcon: FunctionComponent<IconProps> = (props) => {
  return (
    <img
      src='/seo/favicon.ico'
      alt='Logo'
      style={{
        height: '30px',
        width: '30px'
      }}
    />
  )
}

export default LogoIcon
