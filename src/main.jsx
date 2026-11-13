import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/index.jsx'
import Login from './pages/Login/index.jsx'

import "@fontsource-variable/inter";
import GlobalStyles from './styles/globalStyles.js'
import Header from './components/Header/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Home />
          </>
        } />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)