import { PropsWithChildren } from 'react'

import Header from '~/components/layout/PublicLayout/components/Navbar'

function NavLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className='bg-patterns'>
        <Header />
        {children}
      </div>
    </>
  )
}

export default NavLayout
