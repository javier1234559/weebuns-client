import { useOutlet } from 'react-router-dom'
// import { CSSTransition, SwitchTransition } from 'react-transition-group'

function TransitionWrapper() {
  // const location = useLocation()
  const currentOutlet = useOutlet()

  return (
    // <SwitchTransition>
    //   <CSSTransition key={location.pathname} classNames='fade' timeout={100}>
    //     <div className='transition-wrapper'>{currentOutlet}</div>
    //   </CSSTransition>
    // </SwitchTransition>

    <>{currentOutlet}</>
  )
}

export default TransitionWrapper
