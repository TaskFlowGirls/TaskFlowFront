import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo1.webp';
import '../styles/header.css';

const Header = () => {
    const navigate = useNavigate();
    const [hoveredBtn, setHoveredBtn] = useState(null);

    // État de connexion basé sur la présence d'un token
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    // NOUVEL ÉTAT : Pour stocker le nom de l'utilisateur
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            setIsLoggedIn(!!token);

            // Si l'utilisateur est stocké, on récupère son prénom
            if (storedUser) {
                try {
                    const userObj = JSON.parse(storedUser);
                    setUserName(userObj.prenom || '');
                } catch (e) {
                    console.error("Erreur parsing user", e);
                }
            }
        };

        checkAuth(); // Vérification au montage du composant
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // On nettoie aussi l'user
        setIsLoggedIn(false);
        setUserName('');
        navigate('/');
    };

    // Styles dynamiques pour les boutons (hovers et variantes)
    const getBtnStyle = (type) => {
        const isPrimary = type === 'primary' || type === 'logout' || type === 'register';
        const isHovered = hoveredBtn === type;

        return {
            backgroundColor: isPrimary ? (isHovered ? '#1A4B7C' : '#2D89C8') : (isHovered ? '#f4f7f9' : 'transparent'),
            color: isPrimary ? '#ffffff' : (isHovered ? '#2D89C8' : '#1A4B7C'),
            borderColor: isPrimary ? (isHovered ? '#1A4B7C' : '#2D89C8') : (isHovered ? '#2D89C8' : '#1A4B7C'),
            transform: (isPrimary && isHovered) ? 'translateY(-1px)' : 'none'
        };
    };

    return (
        <header className="header-main">
            <div className="header-container">
                <Link to="/" className="logo-wrapper">
                    <img src={logo} alt="Logo" className="logo-icon" />
                    <span className="brand-name">TaskFlow</span>
                </Link>

                <nav className="header-nav">
                    {isLoggedIn ? (
                        <div className="user-area" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {/* AJOUT : Affichage du prénom à côté de l'icône */}
                            <div className="user-profile-display" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {/* AJOUT : Link pour rendre le profil cliquable */}
                                <Link to="/mon-compte" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                <svg
                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="#1A4B7C" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="user-icon-svg"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                {userName && (
                                    <span style={{ color: '#1A4B7C', fontWeight: '600', fontSize: '0.95rem' }}>
                                        {userName}
                                    </span>
                                )}
                                </Link>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="btn-link-base"
                                style={getBtnStyle('logout')}
                                onMouseEnter={() => setHoveredBtn('logout')}
                                onMouseLeave={() => setHoveredBtn(null)}
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="btn-link-base"
                                style={getBtnStyle('login')}
                                onMouseEnter={() => setHoveredBtn('login')}
                                onMouseLeave={() => setHoveredBtn(null)}
                            >
                                Connexion
                            </Link>
                            <Link
                                to="/register"
                                className="btn-link-base"
                                style={getBtnStyle('register')}
                                onMouseEnter={() => setHoveredBtn('register')}
                                onMouseLeave={() => setHoveredBtn(null)}
                            >
                                Inscription
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;