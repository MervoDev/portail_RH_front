// src/components/layout/Header.tsx
import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  Tooltip,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Search,
  Notifications,
  Mail,
  Brightness4,
  Brightness7,
} from '@mui/icons-material'

interface HeaderProps {
  toggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [darkMode, setDarkMode] = useState(false)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // Ici vous pourriez ajouter la logique pour changer le thème
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Portail RH - Entreprise XYZ
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Search sx={{ 
              position: 'absolute', 
              left: 10, 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'text.secondary'
            }} />
            <InputBase
              placeholder="Rechercher..."
              sx={{
                pl: 4,
                pr: 2,
                py: 0.5,
                backgroundColor: 'action.hover',
                borderRadius: 1,
                fontSize: '0.875rem',
                '&:hover': {
                  backgroundColor: 'action.selected',
                }
              }}
            />
          </Box>
          
          <Tooltip title="Messages">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={darkMode ? 'Mode clair' : 'Mode sombre'}>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          
          <Avatar
            sx={{ 
              bgcolor: 'primary.main', 
              cursor: 'pointer',
              width: 40,
              height: 40,
            }}
            onClick={handleMenu}
          >
            JD
          </Avatar>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 180,
              }
            }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar sx={{ width: 24, height: 24, mr: 2, fontSize: '0.875rem' }}>JD</Avatar>
              Mon Profil
            </MenuItem>
            <MenuItem onClick={handleClose}>Paramètres</MenuItem>
            <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>Déconnexion</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header