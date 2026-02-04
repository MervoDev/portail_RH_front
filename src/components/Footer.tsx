import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <div className="footer-brand-content">
              <img src="/N.png" alt="Logo" className="footer-logo" />
              <h3>Portail RH</h3>
            </div>
            <p>Gestion moderne des ressources humaines</p>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Fonctionnalités</h4>
          <ul>
            <li>Gestion des congés</li>
            <li>Suivi des absences</li>
            <li>Tableau de bord</li>
            <li>Rapports & Statistiques</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Documentation</li>
            <li>Centre d'aide</li>
            <li>Contact support</li>
            <li>FAQ</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Entreprise</h4>
          <ul>
            <li>À propos</li>
            <li>Confidentialité</li>
            <li>Conditions d'utilisation</li>
            <li>Sécurité</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Portail RH. Tous droits réservés.</p>
          <div className="footer-social">
            <span>Développé avec ❤️ pour votre entreprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
}