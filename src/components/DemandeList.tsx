import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../api/axios";

interface Demande {
  id: number;
  type: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
}

export default function DemandeList() {
  const [data, setData] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/conges/my").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const columns = [
    { name: "Type", selector: (row: Demande) => row.type },
    { name: "Début", selector: (row: Demande) => row.dateDebut },
    { name: "Fin", selector: (row: Demande) => row.dateFin },
    { name: "Statut", selector: (row: Demande) => row.statut },
  ];

  return (
    <DataTable
      title="Mes demandes"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      highlightOnHover
      striped
    />
  );
}
