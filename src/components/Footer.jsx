import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo2.webp';
import '../styles/Footer.css';

const Footer = () => {
    // État pour gérer le survol des liens
    const [hoveredLink, setHoveredLink] = useState(null);

    // Fonction pour appliquer les hovers dynamiques
    const getLinkStyle = (id) => ({
        opacity: hoveredLink === id ? 1 : 0.7,
        color: hoveredLink === id ? '#2D89C8' : '#ffffff',
        textDecoration: 'none',
        transition: 'all 0.3s ease'
    });

    return (
        <footer className="footer-main">
            <div className="footer-container">
                {/* Partie Gauche - Logo + Texte */}
                <div className="footer-brand-section">
                    <div className="footer-logo-area">
                        <img src={logo} alt="TaskFlow Logo" className="footer-logo-img" />
                    </div>
                    <p className="footer-description">
                        Gestionnaire de tâches collaboratif pour équipes performantes.
                    </p>
                </div>

                {/* Partie Droite - Liens */}
                <div className="footer-links-container">
                    <div className="footer-column">
                        <span className="footer-column-title">Produit</span>
                        <a
                            href="#features"
                            className="footer-link-base"
                            style={getLinkStyle('features')}
                            onMouseEnter={() => setHoveredLink('features')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Fonctionnalités
                        </a>
                        <a
                            href="#security"
                            className="footer-link-base"
                            style={getLinkStyle('security')}
                            onMouseEnter={() => setHoveredLink('security')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Sécurité
                        </a>
                    </div>
                    <div className="footer-column">
                        <span className="footer-column-title">Support</span>
                        {/* Modification ici : Utilisation de Link vers /contact */}
                        <Link
                            to="/contact"
                            className="footer-link-base"
                            style={getLinkStyle('contact')}
                            onMouseEnter={() => setHoveredLink('contact')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Contact
                        </Link>
                        <Link
                            to="/cgu"
                            className="footer-link-base"
                            style={getLinkStyle('terms')}
                            onMouseEnter={() => setHoveredLink('terms')}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            CGU
                        </Link>
                    </div>
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-copyright">
                © 2026 TaskFlow - Tous droits réservés
            </div>
        </footer>
    );
};

export default Footer;