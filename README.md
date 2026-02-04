# 🏢 Portail RH - Frontend

Interface moderne et responsive pour la gestion des congés et absences.

## ✨ Fonctionnalités

### 👤 Espace Employé
- ➕ **Nouvelle demande** : Créer des demandes de congés ou d'absences
- 📄 **Mes demandes** : Consulter l'historique avec filtres et statistiques
- 📅 **Calendrier** : Vue calendrier (à venir)

### 🔧 Espace Administrateur
- 📊 **Tableau de bord** : Statistiques en temps réel
- 📋 **Gestion des demandes** : Valider/Refuser les demandes
- 👥 **Utilisateurs** : Gestion des utilisateurs (à venir)
- 📈 **Statistiques** : Rapports avancés (à venir)

## 🚀 Démarrage

### Prérequis
- Node.js 18+
- Backend PostgreSQL en cours d'exécution sur `http://localhost:3001`

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```
L'application sera disponible sur `http://localhost:5173`

### Production
```bash
npm run build
npm run preview
```

## 🎨 Design System

### Couleurs principales
- **Primary**: `#667eea` → `#764ba2` (gradient)
- **Success**: `#48bb78`
- **Warning**: `#f6ad55`
- **Error**: `#f56565`
- **Gray**: `#718096`

### Composants
- **Navbar** : Navigation principale avec profil utilisateur
- **Sidebar** : Menu contextuel (Admin/Employé)
- **Cards** : Affichage des demandes avec statuts visuels
- **Forms** : Formulaires avec validation et feedback

## 🔧 Architecture

```
src/
├── auth/           # Contexte d'authentification
├── components/     # Composants réutilisables
├── pages/          # Pages principales
├── api/            # Configuration Axios
└── assets/         # Ressources statiques
```

## 📱 Responsive

L'interface s'adapte automatiquement :
- **Desktop** : Sidebar + contenu principal
- **Mobile** : Navigation empilée

## 🔐 Authentification

- **JWT** stocké dans localStorage
- **Auto-reconnexion** au rechargement
- **Rôles** : ADMIN / EMPLOYEE

## 🎯 Statuts des demandes

- ⏳ **EN_ATTENTE** : Demande en cours de traitement
- ✅ **VALIDE** : Demande approuvée
- ❌ **REFUSE** : Demande rejetée

## 🚀 Prochaines fonctionnalités

- 📅 Vue calendrier interactive
- 📊 Graphiques et statistiques avancées
- 🔔 Notifications en temps réel
- 📱 Application mobile (PWA)
- 🌙 Mode sombre