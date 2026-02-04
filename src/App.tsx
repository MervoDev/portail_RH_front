import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import "./App.css";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Chargement...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (user.role === "ADMIN") {
    return <AdminDashboard />;
  }
 
  return <EmployeeDashboard />;
}
