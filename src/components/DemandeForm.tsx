import { useState } from "react";
import "./DemandeForm.css";
import api from "../api/axios";

export default function DemandeForm() {
  const [type, setType] = useState<"CONGE" | "ABSENCE">("CONGE");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validation des dates
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    
    if (debut >= fin) {
      setMessage("La date de fin doit être postérieure à la date de début");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const url = type === "CONGE" ? "/conges" : "/absences";

      await api.post(url, {
        dateDebut,
        dateFin,
      });

      setMessage(`✅ Demande de ${type.toLowerCase()} envoyée avec succès !`);
      setMessageType("success");
      setDateDebut("");
      setDateFin("");
    } catch (error: any) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Erreur lors de l'envoi de la demande";
      setMessage(`❌ ${errorMsg}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const calculateDays = () => {
    if (dateDebut && dateFin) {
      const debut = new Date(dateDebut);
      const fin = new Date(dateFin);
      const diffTime = fin.getTime() - debut.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  return (
    <div className="demande-form-container">
      <form className="demande-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Créer une nouvelle demande</h2>
          <p>Remplissez les informations ci-dessous pour soumettre votre demande</p>
        </div>

        <div className="form-content">
          <div className="form-group">
            <label htmlFor="type">
              Type de demande
            </label>
            <select 
              id="type"
              value={type} 
              onChange={(e) => setType(e.target.value as "CONGE" | "ABSENCE")}
              className="form-select"
            >
              <option value="CONGE">🏖️ Congé</option>
              <option value="ABSENCE">🏥 Absence</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateDebut">
                Date de début
              </label>
              <input
                id="dateDebut"
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateFin">
                Date de fin
              </label>
              <input
                id="dateFin"
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {dateDebut && dateFin && (
            <div className="duration-info">
              <span className="duration-icon">⏱️</span>
              <span>Durée: <strong>{calculateDays()} jour(s)</strong></span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`submit-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer la demande
              </>
            )}
          </button>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}