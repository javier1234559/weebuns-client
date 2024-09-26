import Routes from '~/router'
import { ThemeProvider } from './theme'

function App() {
  return (
    <>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </>
  )
}

export default App
