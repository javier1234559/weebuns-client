import { useLocation, useOutlet } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

const TransitionWrapper = () => {
  const location = useLocation()
  const currentOutlet = useOutlet()

  return (
    <SwitchTransition>
      <CSSTransition key={location.pathname} classNames='fade' timeout={300}>
        <div className='transition-wrapper'>{currentOutlet}</div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default TransitionWrapper
