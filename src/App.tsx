import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

export default function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  if (user.role === "ADMIN") {
    return <AdminDashboard />;
  }
 
   return <EmployeeDashboard />;
}
