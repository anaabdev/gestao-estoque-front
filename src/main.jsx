import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home/index.jsx'
import GlobalStyles from './styles/globalStyles.js'
import Header from './components/Header/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <GlobalStyles />
    <Home />
    
  </StrictMode>,
)
