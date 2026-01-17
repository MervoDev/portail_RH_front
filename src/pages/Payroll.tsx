// src/pages/Payroll.tsx
import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material' 
import {
  Download,
  Print,
  AttachMoney,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material'

const Payroll = () => {
  const payrollData = [
    {
      id: 1,
      employee: 'Jean Dupont',
      salary: '4,500€',
      bonus: '500€',
      deductions: '1,200€',
      net: '3,800€',
      status: 'Payé',
    },
    {
      id: 2,
      employee: 'Marie Martin',
      salary: '5,200€',
      bonus: '800€',
      deductions: '1,400€',
      net: '4,600€',
      status: 'Payé',
    },
    {
      id: 3,
      employee: 'Pierre Bernard',
      salary: '3,800€',
      bonus: '300€',
      deductions: '1,000€',
      net: '3,100€',
      status: 'En attente',
    },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Gestion de la Paie</Typography>
        <Box>
          <Button startIcon={<Download />} sx={{ mr: 1 }}>
            Exporter
          </Button>
          <Button startIcon={<Print />} variant="contained">
            Imprimer
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 1, color: 'success.main' }} />
                <Typography color="textSecondary">Masse salariale</Typography>
              </Box>
              <Typography variant="h4">245,800€</Typography>
              <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} /> +5.2%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 1, color: 'warning.main' }} />
                <Typography color="textSecondary">Moyenne salaire</Typography>
              </Box>
              <Typography variant="h4">3,850€</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 1, color: 'info.main' }} />
                <Typography color="textSecondary">Primes du mois</Typography>
              </Box>
              <Typography variant="h4">12,400€</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 1, color: 'error.main' }} />
                <Typography color="textSecondary">Retenues</Typography>
              </Box>
              <Typography variant="h4">48,200€</Typography>
              <Typography variant="body2" color="error.main" sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} /> -2.1%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employé</TableCell>
                <TableCell align="right">Salaire brut</TableCell>
                <TableCell align="right">Prime</TableCell>
                <TableCell align="right">Retenues</TableCell>
                <TableCell align="right">Net à payer</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payrollData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.employee}</TableCell>
                  <TableCell align="right">{row.salary}</TableCell>
                  <TableCell align="right">{row.bonus}</TableCell>
                  <TableCell align="right">{row.deductions}</TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">{row.net}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: row.status === 'Payé' ? 'success.main' : 'warning.main',
                        fontWeight: 'bold',
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default Payroll