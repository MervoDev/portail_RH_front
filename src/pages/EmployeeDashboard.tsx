import { useState } from "react";
import DemandeForm from "../components/DemandeForm";
import DemandeList from "../components/DemandeList";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const [activeView, setActiveView] = useState<"form" | "list" | "calendar">("form");

  const renderContent = () => {
    switch (activeView) {
      case "form":
        return <DemandeForm />;
      case "list":
        return <DemandeList />;
      case "calendar":
        return (
          <div className="coming-soon">
            📅 Vue calendrier - Bientôt disponible
          </div>
        );
      default:
        return <DemandeForm />;
    }
  };

  return (
    <div className="employee-dashboard">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar 
          activeView={activeView} 
          onViewChange={(view) => setActiveView(view as "form" | "list" | "calendar")} 
          isAdmin={false} 
        />
        <main className="dashboard-content">
          <div className="content-header">
            <h1>
              {activeView === "form" && "Nouvelle demande"}
              {activeView === "list" && "Mes demandes"}
              {activeView === "calendar" && "Calendrier"}
            </h1>
            <p className="content-subtitle">
              {activeView === "form" && "Créez une nouvelle demande de congé ou d'absence"}
              {activeView === "list" && "Consultez l'historique de vos demandes"}
              {activeView === "calendar" && "Visualisez vos congés et absences"}
            </p>
          </div>
          
          <div className="content-body">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}