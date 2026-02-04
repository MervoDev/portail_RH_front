import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/N.png" alt="Logo" className="navbar-logo" />
        <h2>Portail RH</h2>
      </div>
      
      <div className="navbar-user">
        <div className="user-info">
          <span className="user-name">👋 {user?.name}</span>
          <span className="user-role">{user?.role === 'ADMIN' ? 'Administrateur' : 'Employé'}</span>
        </div>
        <button className="logout-btn" onClick={logout}>
          🚪 Déconnexion
        </button>
      </div>
    </nav>
  );
}