// src/pages/Login.tsx
import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  Grid,
} from '@mui/material'
import { LockOutlined, Email, Password } from '@mui/icons-material'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulation de connexion
    if (email && password) {
      console.log('Connexion avec:', { email, password, rememberMe })
      // Redirection vers le dashboard
      window.location.href = '/'
    } else {
      setError('Veuillez remplir tous les champs')
    }
  }

  return (
    <Container component="main" maxWidth="lg">
      <Grid container sx={{ minHeight: '100vh', alignItems: 'center' }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Portail RH
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Gestion simplifiée des ressources humaines
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Accédez à toutes les fonctionnalités de gestion des employés, congés, paie et performances en un seul endroit.
            </Typography>
            <Box sx={{ mt: 4 }}>
              {[
                '✅ Gestion complète des employés',
                '✅ Suivi des congés en temps réel',
                '✅ Paie automatisée',
                '✅ Évaluations de performance',
                '✅ Documents sécurisés',
              ].map((feature, index) => (
                <Typography key={index} variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {feature}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
              <Avatar sx={{ m: 'auto', mb: 2, bgcolor: 'primary.main', width: 56, height: 56 }}>
                <LockOutlined />
              </Avatar>
              
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                Connexion au Portail RH
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email professionnel"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: <Password sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    }
                    label="Se souvenir de moi"
                  />
                  <Link href="#" variant="body2">
                    Mot de passe oublié ?
                  </Link>
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  Se connecter
                </Button>
                
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                  Version 1.0 • Portail RH Entreprise XYZ
                </Typography>
              </Box>
            </Paper>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                © 2024 Portail RH. Tous droits réservés.
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Pour toute assistance, contactez support@entreprise.com
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login