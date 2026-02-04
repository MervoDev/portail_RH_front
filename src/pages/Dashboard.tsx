import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./Dashboard.css";

interface Demande {
  id: number;
  type: "CONGE" | "ABSENCE";
  dateDebut: string;
  dateFin: string;
  statut: "EN_ATTENTE" | "VALIDE" | "REFUSE";
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("demandes");
  const [stats, setStats] = useState({
    total: 0,
    enAttente: 0,
    validees: 0,
    refusees: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Calculer les stats
    const total = demandes.length;
    const enAttente = demandes.filter(d => d.statut === "EN_ATTENTE").length;
    const validees = demandes.filter(d => d.statut === "VALIDE").length;
    const refusees = demandes.filter(d => d.statut === "REFUSE").length;
    
    setStats({ total, enAttente, validees, refusees });
  }, [demandes]);

  async function loadData() {
    try {
      const [congesRes, absencesRes] = await Promise.all([
        api.get("/conges"),
        api.get("/absences"),
      ]);

      const allDemandes = [
        ...congesRes.data.map((c: any) => ({ ...c, type: "CONGE" })),
        ...absencesRes.data.map((a: any) => ({ ...a, type: "ABSENCE" })),
      ];

      setDemandes(allDemandes);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(
    type: "CONGE" | "ABSENCE",
    id: number,
    action: "validate" | "reject"
  ) {
    try {
      const url = type === "CONGE" 
        ? `/conges/${id}/${action}` 
        : `/absences/${id}/${action}`;

      await api.patch(url);

      setDemandes((prev) =>
        prev.map((d) =>
          d.id === id && d.type === type
            ? { ...d, statut: action === "validate" ? "VALIDE" : "REFUSE" }
            : d
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
    }
  }

  const getStatusBadge = (statut: string) => {
    const badges = {
      "EN_ATTENTE": { class: "status-pending", text: "⏳ En attente" },
      "VALIDE": { class: "status-approved", text: "✅ Validé" },
      "REFUSE": { class: "status-rejected", text: "❌ Refusé" }
    };
    return badges[statut as keyof typeof badges] || badges["EN_ATTENTE"];
  };

  const renderDashboard = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total demandes</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.enAttente}</h3>
            <p>En attente</p>
          </div>
        </div>
        <div className="stat-card approved">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.validees}</h3>
            <p>Validées</p>
          </div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3>{stats.refusees}</h3>
            <p>Refusées</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDemandes = () => (
    <div className="demandes-section">
      <div className="section-header">
        <h2>📋 Gestion des demandes</h2>
        <button className="refresh-btn" onClick={loadData}>
          🔄 Actualiser
        </button>
      </div>

      {loading ? (
        <div className="loading">Chargement des demandes...</div>
      ) : (
        <div className="demandes-grid">
          {demandes.map((demande) => (
            <div key={`${demande.type}-${demande.id}`} className="demande-card">
              <div className="demande-header">
                <div className="demande-type">
                  {demande.type === "CONGE" ? "🏖️ Congé" : "🏥 Absence"}
                </div>
                <div className={`status-badge ${getStatusBadge(demande.statut).class}`}>
                  {getStatusBadge(demande.statut).text}
                </div>
              </div>
              
              <div className="demande-content">
                <div className="demande-user">
                  <strong>👤 {demande.user?.name || demande.user?.email}</strong>
                </div>
                <div className="demande-dates">
                  <span>📅 Du {new Date(demande.dateDebut).toLocaleDateString()}</span>
                  <span>📅 Au {new Date(demande.dateFin).toLocaleDateString()}</span>
                </div>
              </div>

              {demande.statut === "EN_ATTENTE" && (
                <div className="demande-actions">
                  <button
                    className="btn-approve"
                    onClick={() => handleAction(demande.type, demande.id, "validate")}
                  >
                    ✅ Valider
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleAction(demande.type, demande.id, "reject")}
                  >
                    ❌ Refuser
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView} 
          isAdmin={true} 
        />
        <main className="dashboard-content">
          {activeView === "dashboard" && renderDashboard()}
          {activeView === "demandes" && renderDemandes()}
          {activeView === "users" && <div className="coming-soon">👥 Gestion des utilisateurs - Bientôt disponible</div>}
          {activeView === "stats" && <div className="coming-soon">📈 Statistiques avancées - Bientôt disponible</div>}
        </main>
      </div>
      <Footer />
    </div>
  );
}
