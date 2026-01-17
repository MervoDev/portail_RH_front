// src/pages/Documents.tsx
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
  IconButton,
  Button,
  Chip,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Description,
  Folder,
  InsertDriveFile,
  PictureAsPdf,
  Image,
  Download,
  Delete,
  Share,
  Upload,
  Search,
  FolderOpen,
} from '@mui/icons-material'

const Documents = () => {
  const [openUpload, setOpenUpload] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('all')

  const documents = [
    {
      id: 1,
      name: 'Contrat de travail.pdf',
      category: 'Contrats',
      size: '2.4 MB',
      type: 'pdf',
      uploaded: '2024-11-15',
      owner: 'RH Department',
    },
    {
      id: 2,
      name: 'Photo profil.jpg',
      category: 'Photos',
      size: '1.2 MB',
      type: 'image',
      uploaded: '2024-11-10',
      owner: 'Jean Dupont',
    },
    {
      id: 3,
      name: 'Bulletin de paie déc 2024.pdf',
      category: 'Paie',
      size: '3.1 MB',
      type: 'pdf',
      uploaded: '2024-12-01',
      owner: 'Finance',
    },
    {
      id: 4,
      name: 'Évaluation annuelle.docx',
      category: 'Évaluations',
      size: '0.8 MB',
      type: 'document',
      uploaded: '2024-11-28',
      owner: 'Manager',
    },
    {
      id: 5,
      name: 'Règlement intérieur.pdf',
      category: 'Administratif',
      size: '5.2 MB',
      type: 'pdf',
      uploaded: '2024-10-15',
      owner: 'RH Department',
    },
  ]

  const categories = [
    { name: 'Contrats', count: 24, color: '#1976d2' },
    { name: 'Paie', count: 156, color: '#4caf50' },
    { name: 'Évaluations', count: 48, color: '#ff9800' },
    { name: 'Administratif', count: 32, color: '#9c27b0' },
    { name: 'Photos', count: 89, color: '#dc004e' },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdf sx={{ color: '#f44336' }} />
      case 'image':
        return <Image sx={{ color: '#4caf50' }} />
      default:
        return <InsertDriveFile sx={{ color: '#2196f3' }} />
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Documents</Typography>
        <Button variant="contained" startIcon={<Upload />} onClick={() => setOpenUpload(true)}>
          Téléverser
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Statistiques */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Description sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
                      <Box>
                        <Typography color="textSecondary">Documents totaux</Typography>
                        <Typography variant="h4">1,245</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Folder sx={{ mr: 2, color: 'success.main', fontSize: 40 }} />
                      <Box>
                        <Typography color="textSecondary">Catégories</Typography>
                        <Typography variant="h4">12</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FolderOpen sx={{ mr: 2, color: 'warning.main', fontSize: 40 }} />
                      <Box>
                        <Typography color="textSecondary">Espace utilisé</Typography>
                        <Typography variant="h4">4.2 GB</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Download sx={{ mr: 2, color: 'info.main', fontSize: 40 }} />
                      <Box>
                        <Typography color="textSecondary">Téléchargements</Typography>
                        <Typography variant="h4">3,458</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Catégories */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Catégories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                startIcon={<Description />}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  bgcolor: categoryFilter === 'all' ? 'action.selected' : 'transparent',
                }}
                onClick={() => setCategoryFilter('all')}
              >
                Tous les documents
                <Chip label="1,245" size="small" sx={{ ml: 'auto' }} />
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  startIcon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: category.color,
                      }}
                    />
                  }
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    bgcolor: categoryFilter === category.name ? 'action.selected' : 'transparent',
                  }}
                  onClick={() => setCategoryFilter(category.name)}
                >
                  {category.name}
                  <Chip label={category.count} size="small" sx={{ ml: 'auto' }} />
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Liste des documents */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Documents récents</Typography>
              <TextField
                size="small"
                placeholder="Rechercher un document..."
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Catégorie</TableCell>
                    <TableCell>Taille</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Propriétaire</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getFileIcon(doc.type)}
                          <Typography sx={{ ml: 2 }}>{doc.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={doc.category} size="small" />
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploaded}</TableCell>
                      <TableCell>{doc.owner}</TableCell>
                      <TableCell>
                        <IconButton size="small" title="Télécharger">
                          <Download />
                        </IconButton>
                        <IconButton size="small" title="Partager">
                          <Share />
                        </IconButton>
                        <IconButton size="small" title="Supprimer" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog d'upload */}
      <Dialog open={openUpload} onClose={() => setOpenUpload(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Téléverser un document</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nom du document" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Catégorie"
                defaultValue=""
              >
                <MenuItem value="">Sélectionner une catégorie</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                component="label"
                startIcon={<Upload />}
                sx={{ py: 2 }}
              >
                Sélectionner un fichier
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Description du document..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpload(false)}>Annuler</Button>
          <Button variant="contained" onClick={() => setOpenUpload(false)}>
            Téléverser
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Documents