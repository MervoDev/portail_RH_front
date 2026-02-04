import "./Sidebar.css";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isAdmin?: boolean;
}

export default function Sidebar({ activeView, onViewChange, isAdmin = false }: SidebarProps) {
  const adminMenuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'demandes', label: 'Toutes les demandes', icon: '📋' },
    { id: 'users', label: 'Utilisateurs', icon: '👥' },
    { id: 'stats', label: 'Statistiques', icon: '📈' },
  ];

  const employeeMenuItems = [
    { id: 'form', label: 'Nouvelle demande', icon: '➕' },
    { id: 'list', label: 'Mes demandes', icon: '📄' },
    { id: 'calendar', label: 'Calendrier', icon: '📅' },
  ];

  const menuItems = isAdmin ? adminMenuItems : employeeMenuItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>{isAdmin ? 'Administration' : 'Mon espace'}</h3>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}