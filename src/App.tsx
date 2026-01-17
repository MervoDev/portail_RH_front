// src/App.tsx
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import Header from './components/layout/Header'  // Chemin corrigé
import Sidebar from './components/layout/Sidebar' // Chemin corrigé
import Dashboard from './pages/Dashboard'
import EmployeeDashboard from './pages/EmployeeDashboard' // Garder le nom exact
import Recruitment from './pages/Recruitment'
import Payroll from './pages/Payroll'
import Performance from './pages/Performance'
import Documents from './pages/Documents'
import Login from './pages/Login'

// Créer une page temporaire pour Leaves (congés)
const Leaves = () => (
  <Box sx={{ p: 3 }}>
    <h1>Gestion des Congés</h1>
    <p>Page en construction...</p>
  </Box>
)

// Créer une page temporaire pour Employees (si différente de EmployeeDashboard)
const Employees = () => (
  <Box sx={{ p: 3 }}>
    <h1>Gestion des Employés</h1>
    <p>Utilisez EmployeeDashboard pour la liste des employés</p>
  </Box>
)

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated] = useState(true) // À remplacer par votre AuthContext

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Si vous avez un AuthContext, utilisez-le :
  // const { isAuthenticated } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: '64px',
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App