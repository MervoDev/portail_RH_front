import { useEffect, useState } from "react";
import api from "../api/axios";
import "./DemandeList.css";

interface Demande {
  id: number;
  type: string;
  dateDebut: string;
  dateFin: string;
  statut: "EN_ATTENTE" | "VALIDE" | "REFUSE";
}

export default function DemandeList() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "EN_ATTENTE" | "VALIDE" | "REFUSE">("ALL");

  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    try {
      const [congesRes, absencesRes] = await Promise.all([
        api.get("/conges/my"),
        api.get("/absences/my")
      ]);

      const allDemandes = [
        ...congesRes.data.map((c: any) => ({ ...c, type: "CONGE" })),
        ...absencesRes.data.map((a: any) => ({ ...a, type: "ABSENCE" })),
      ].sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());

      setDemandes(allDemandes);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDemandes = demandes.filter(demande => 
    filter === "ALL" || demande.statut === filter
  );

  const getStatusBadge = (statut: string) => {
    const badges = {
      "EN_ATTENTE": { class: "status-pending", text: "⏳ En attente", color: "#f6ad55" },
      "VALIDE": { class: "status-approved", text: "✅ Validé", color: "#48bb78" },
      "REFUSE": { class: "status-rejected", text: "❌ Refusé", color: "#f56565" }
    };
    return badges[statut as keyof typeof badges] || badges["EN_ATTENTE"];
  };

  const calculateDays = (dateDebut: string, dateFin: string) => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = fin.getTime() - debut.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const getStats = () => {
    const total = demandes.length;
    const enAttente = demandes.filter(d => d.statut === "EN_ATTENTE").length;
    const validees = demandes.filter(d => d.statut === "VALIDE").length;
    const refusees = demandes.filter(d => d.statut === "REFUSE").length;
    
    return { total, enAttente, validees, refusees };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Chargement de vos demandes...</p>
      </div>
    );
  }

  return (
    <div className="demande-list-container">
      <div className="list-header">
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item pending">
            <span className="stat-number">{stats.enAttente}</span>
            <span className="stat-label">En attente</span>
          </div>
          <div className="stat-item approved">
            <span className="stat-number">{stats.validees}</span>
            <span className="stat-label">Validées</span>
          </div>
          <div className="stat-item rejected">
            <span className="stat-number">{stats.refusees}</span>
            <span className="stat-label">Refusées</span>
          </div>
        </div>

        <div className="filter-controls">
          <button 
            className={filter === "ALL" ? "active" : ""}
            onClick={() => setFilter("ALL")}
          >
            Toutes
          </button>
          <button 
            className={filter === "EN_ATTENTE" ? "active" : ""}
            onClick={() => setFilter("EN_ATTENTE")}
          >
            En attente
          </button>
          <button 
            className={filter === "VALIDE" ? "active" : ""}
            onClick={() => setFilter("VALIDE")}
          >
            Validées
          </button>
          <button 
            className={filter === "REFUSE" ? "active" : ""}
            onClick={() => setFilter("REFUSE")}
          >
            Refusées
          </button>
        </div>
      </div>

      {filteredDemandes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Aucune demande trouvée</h3>
          <p>
            {filter === "ALL" 
              ? "Vous n'avez pas encore fait de demande"
              : `Aucune demande ${filter.toLowerCase().replace('_', ' ')}`
            }
          </p>
        </div>
      ) : (
        <div className="demandes-grid">
          {filteredDemandes.map((demande) => (
            <div key={`${demande.type}-${demande.id}`} className="demande-card">
              <div className="card-header">
                <div className="demande-type">
                  {demande.type === "CONGE" ? "🏖️ Congé" : "🏥 Absence"}
                </div>
                <div className={`status-badge ${getStatusBadge(demande.statut).class}`}>
                  {getStatusBadge(demande.statut).text}
                </div>
              </div>
              
              <div className="card-content">
                <div className="date-range">
                  <div className="date-item">
                    <span className="date-label">Du</span>
                    <span className="date-value">
                      {new Date(demande.dateDebut).toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  <div className="date-separator">→</div>
                  <div className="date-item">
                    <span className="date-label">Au</span>
                    <span className="date-value">
                      {new Date(demande.dateFin).toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="duration">
                  <span className="duration-icon">⏱️</span>
                  <span>{calculateDays(demande.dateDebut, demande.dateFin)} jour(s)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
