// src/pages/Performance.tsx
import React, { useState } from 'react'
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
  Avatar,
  LinearProgress,
  Rating,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import {
  TrendingUp,
  Assessment,
  Star,
  StarBorder,
  EmojiEvents,
} from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Performance = () => {
  const [timeframe, setTimeframe] = useState('quarter')

  const performanceData = [
    { month: 'Jan', performance: 75, goals: 80 },
    { month: 'Fév', performance: 78, goals: 82 },
    { month: 'Mar', performance: 82, goals: 85 },
    { month: 'Avr', performance: 85, goals: 85 },
    { month: 'Mai', performance: 88, goals: 87 },
    { month: 'Jun', performance: 90, goals: 90 },
  ]

  const employees = [
    {
      id: 1,
      name: 'Jean Dupont',
      position: 'Développeur Senior',
      department: 'IT',
      rating: 4.5,
      progress: 90,
      goals: 8,
      completed: 7,
      avatarColor: '#1976d2',
    },
    {
      id: 2,
      name: 'Marie Martin',
      position: 'Chef de projet',
      department: 'Management',
      rating: 4.2,
      progress: 85,
      goals: 10,
      completed: 8,
      avatarColor: '#dc004e',
    },
    {
      id: 3,
      name: 'Pierre Bernard',
      position: 'Analyste financier',
      department: 'Finance',
      rating: 4.7,
      progress: 95,
      goals: 6,
      completed: 6,
      avatarColor: '#4caf50',
    },
  ]

  const topPerformers = [
    { name: 'Sophie Petit', achievement: 'Objectifs dépassés +30%' },
    { name: 'Thomas Leroy', achievement: 'Projet livré en avance' },
    { name: 'Julie Moreau', achievement: 'Client satisfaction 98%' },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Performance</Typography>
        <ToggleButtonGroup
          value={timeframe}
          exclusive
          onChange={(e, newValue) => setTimeframe(newValue)}
          size="small"
        >
          <ToggleButton value="month">Mensuel</ToggleButton>
          <ToggleButton value="quarter">Trimestriel</ToggleButton>
          <ToggleButton value="year">Annuel</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* Statistiques */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1, color: 'success.main' }} />
                <Typography color="textSecondary">Performance moyenne</Typography>
              </Box>
              <Typography variant="h4">86%</Typography>
              <Typography variant="body2" color="success.main">
                +5% vs dernier trimestre
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ mr: 1, color: 'primary.main' }} />
                <Typography color="textSecondary">Évaluations</Typography>
              </Box>
              <Typography variant="h4">24</Typography>
              <Typography variant="body2" color="textSecondary">
                En attente: 3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Star sx={{ mr: 1, color: 'warning.main' }} />
                <Typography color="textSecondary">Note moyenne</Typography>
              </Box>
              <Typography variant="h4">4.3/5</Typography>
              <Rating value={4.3} precision={0.1} readOnly size="small" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmojiEvents sx={{ mr: 1, color: 'info.main' }} />
                <Typography color="textSecondary">Objectifs atteints</Typography>
              </Box>
              <Typography variant="h4">87%</Typography>
              <LinearProgress variant="determinate" value={87} color="success" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique de performance */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Évolution de la performance
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="performance" stroke="#1976d2" strokeWidth={2} />
                <Line type="monotone" dataKey="goals" stroke="#4caf50" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top performers */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Top Performers
            </Typography>
            {topPerformers.map((performer, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {performer.name}
                  </Typography>
                  <Chip
                    label={performer.achievement}
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Tableau des performances */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Performance par employé
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employé</TableCell>
                    <TableCell>Poste</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Progression</TableCell>
                    <TableCell>Objectifs</TableCell>
                    <TableCell>Statut</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: employee.avatarColor, mr: 2, width: 32, height: 32 }}>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          {employee.name}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{employee.position}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {employee.department}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating
                            value={employee.rating}
                            precision={0.5}
                            readOnly
                            size="small"
                            emptyIcon={<StarBorder fontSize="small" />}
                          />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {employee.rating}/5
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={employee.progress}
                              color={
                                employee.progress >= 90 ? 'success' :
                                employee.progress >= 75 ? 'primary' : 'warning'
                              }
                            />
                          </Box>
                          <Typography variant="body2">{employee.progress}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {employee.completed}/{employee.goals}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            employee.progress >= 90 ? 'Excellent' :
                            employee.progress >= 75 ? 'Bon' : 'À améliorer'
                          }
                          color={
                            employee.progress >= 90 ? 'success' :
                            employee.progress >= 75 ? 'primary' : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Performance