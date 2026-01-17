
import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
} from '@mui/material'
import {
  Add,
  Work,
  Schedule,
  CheckCircle,
  Cancel,
} from '@mui/icons-material'

const Recruitment = () => {
  const jobOpenings = [
    {
      id: 1,
      title: 'Développeur Frontend',
      department: 'IT',
      applicants: 24,
      status: 'Active',
      deadline: '2024-12-31',
      progress: 65,
    },
    {
      id: 2,
      title: 'Chef de projet',
      department: 'Management',
      applicants: 12,
      status: 'Active',
      deadline: '2024-12-25',
      progress: 40,
    },
    {
      id: 3,
      title: 'Analyste financier',
      department: 'Finance',
      applicants: 18,
      status: 'Closed',
      deadline: '2024-11-30',
      progress: 100,
    },
  ]

  const candidates = [
    {
      id: 1,
      name: 'Paul Durand',
      position: 'Développeur Frontend',
      stage: 'Entretien technique',
      date: '2024-12-05',
      status: 'En cours',
      avatarColor: '#1976d2',
    },
    {
      id: 2,
      name: 'Julie Lambert',
      position: 'Chef de projet',
      stage: 'Entretien RH',
      date: '2024-12-03',
      status: 'En attente',
      avatarColor: '#dc004e',
    },
    {
      id: 3,
      name: 'Marc Dubois',
      position: 'Analyste financier',
      stage: 'Offre envoyée',
      date: '2024-11-28',
      status: 'Accepté',
      avatarColor: '#4caf50',
    },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Recrutement</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Nouvelle offre
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Statistiques */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Work sx={{ mr: 1, color: 'primary.main' }} />
                <Typography color="textSecondary">Postes ouverts</Typography>
              </Box>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Schedule sx={{ mr: 1, color: 'warning.main' }} />
                <Typography color="textSecondary">En cours</Typography>
              </Box>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                <Typography color="textSecondary">Embauchés</Typography>
              </Box>
              <Typography variant="h4">6</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Cancel sx={{ mr: 1, color: 'error.main' }} />
                <Typography color="textSecondary">Rejetés</Typography>
              </Box>
              <Typography variant="h4">18</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Postes ouverts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Postes ouverts
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Poste</TableCell>
                    <TableCell>Département</TableCell>
                    <TableCell>Candidats</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Progression</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobOpenings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>
                        <Chip label={job.department} size="small" />
                      </TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell>
                        <Chip
                          label={job.status}
                          color={job.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={job.progress}
                              color={job.progress === 100 ? 'success' : 'primary'}
                            />
                          </Box>
                          <Typography variant="body2">{job.progress}%</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Candidats récents */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Candidats récents
            </Typography>
            {candidates.map((candidate) => (
              <Card key={candidate.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: candidate.avatarColor, mr: 2 }}>
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{candidate.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {candidate.position}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    Étape: {candidate.stage}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Date: {candidate.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Recruitment