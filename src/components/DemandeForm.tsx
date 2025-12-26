import { useState } from "react";
import "./DemandeForm.css";
import api from "../api/axios";

export default function DemandeForm() {
  const [type, setType] = useState<"CONGE" | "ABSENCE">("CONGE");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = type === "CONGE" ? "/conges" : "/absences";

      await api.post(url, {
        dateDebut,
        dateFin,
      });

      setMessage("Demande envoyée avec succès ✅");
      setDateDebut("");
      setDateFin("");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l’envoi ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="demande-form" onSubmit={handleSubmit}>
      <h2>Nouvelle demande</h2>

      <div className="form-group">
        <label>Type de demande</label>
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="CONGE">Congé</option>
          <option value="ABSENCE">Absence</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date de début</label>
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date de fin</label>
          <input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Envoi..." : "Envoyer"}
      </button>

      {message && <p className="message">{message}</p>}
    </form>
  );
}
