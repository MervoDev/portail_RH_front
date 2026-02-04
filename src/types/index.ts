// Types pour l'authentification
export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Types pour les demandes
export type DemandeType = "CONGE" | "ABSENCE";
export type DemandeStatus = "EN_ATTENTE" | "VALIDE" | "REFUSE";

export interface Demande {
  id: number;
  type: DemandeType;
  dateDebut: string;
  dateFin: string;
  statut: DemandeStatus;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

// Types pour les statistiques
export interface Stats {
  total: number;
  enAttente: number;
  validees: number;
  refusees: number;
}

// Types pour les composants
export interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isAdmin?: boolean;
}

export interface StatusBadge {
  class: string;
  text: string;
  color?: string;
}