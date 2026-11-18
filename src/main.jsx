import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/index.jsx'
import Login from './pages/Login/index.jsx'
import Perfil from './pages/Perfil/index.jsx'
import Configuracoes from './pages/Configuracoes/index.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'


import "@fontsource-variable/inter";
import GlobalStyles from './styles/globalStyles.js'
import Header from './components/Header/index.jsx'
import { AppSettingsProvider } from './context/AppSettingsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppSettingsProvider>
      <BrowserRouter>
        <GlobalStyles />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <>
                <Header />
                <Home />
              </>
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <>
                <Header />
                <Home />
              </>
            </ProtectedRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute>
              <>
                <Header />
                <Perfil />
              </>
            </ProtectedRoute>
          } />
          <Route path="/configuracoes" element={
            <ProtectedRoute>
              <>
                <Header />
                <Configuracoes />
              </>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AppSettingsProvider>
  </StrictMode>,
)