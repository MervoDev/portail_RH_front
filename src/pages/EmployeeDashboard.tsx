import { useState } from "react";
import DemandeForm from "../components/DemandeForm";
import DemandeList from "../components/DemandeList";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const [view, setView] = useState<"form" | "list">("form");

  return (
    <div className="employee-dashboard">
      <h1>Dashboard Employé</h1>
      <p className="subtitle">
        Gérez vos demandes de congés et d’absences
      </p>

      <div className="employee-actions">
        <button
          className={view === "form" ? "active" : ""}
          onClick={() => setView("form")}
        >
          Nouvelle demande
        </button>

        <button
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          Mes demandes
        </button>
      </div>

      <div className="employee-content">
        {view === "form" && <DemandeForm />}
        {view === "list" && <DemandeList />}
      </div>
    </div>
  );
}
