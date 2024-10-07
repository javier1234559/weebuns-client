import { FunctionComponent } from 'react'

import { IconProps } from '../utils'

const Assignment: FunctionComponent<IconProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='lucide lucide-check-check'
    >
      <path d='M18 6 7 17l-5-5' />
      <path d='m22 10-7.5 7.5L13 16' />
    </svg>
  )
}

export default Assignment
