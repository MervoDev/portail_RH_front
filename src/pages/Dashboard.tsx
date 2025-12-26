import { useEffect, useState } from "react";
import api from "../api/axios";

interface Demande {
  id: number;
  type: "CONGE" | "ABSENCE";
  dateDebut: string;
  dateFin: string;
  statut: "EN_ATTENTE" | "VALIDEE" | "REFUSEE";
  user: {
    id: number;
    email: string;
  };
}

export default function AdminDashboard() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        alert("Erreur lors du chargement des demandes");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleAction(
    type: "CONGE" | "ABSENCE",
    id: number,
    action: "validate" | "reject"
  ) {
    const url =
      type === "CONGE"
        ? `/conges/${id}/${action}`
        : `/absences/${id}/${action}`;

    await api.patch(url);

    setDemandes((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, statut: action === "validate" ? "VALIDEE" : "REFUSEE" }
          : d
      )
    );
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard Admin</h2>

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>Employé</th>
            <th>Type</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {demandes.map((d) => (
            <tr key={`${d.type}-${d.id}`}>
              <td>{d.user?.email}</td>
              <td>{d.type}</td>
              <td>{d.dateDebut}</td>
              <td>{d.dateFin}</td>
              <td>{d.statut}</td>
              <td>
                {d.statut === "EN_ATTENTE" && (
                  <>
                    <button
                      onClick={() =>
                        handleAction(d.type, d.id, "validate")
                      }
                    >
                      Valider
                    </button>{" "}
                    <button
                      onClick={() =>
                        handleAction(d.type, d.id, "reject")
                      }
                    >
                      Refuser
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
