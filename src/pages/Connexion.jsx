import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/connexion.css';

const Connexion = () => {
    const navigate = useNavigate();
    const [hoveredBtn, setHoveredBtn] = useState(false);
    const [hoveredForgot, setHoveredForgot] = useState(false);
    const [hoveredRegister, setHoveredRegister] = useState(false);

    // États pour le formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // On utilise 'password' pour matcher le Backend
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // 1. Sauvegarde du token
                localStorage.setItem('token', data.token);

                // 2. Sauvegarde de l'objet user pour le Header
                localStorage.setItem('user', JSON.stringify(data.user));

                // 3. Redirection vers la page d'accueil ou dashboard
                navigate('/');
            } else {
                alert(data.message || "Email ou mot de passe incorrect");
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
            alert("Le serveur ne répond pas. Vérifie qu'il est bien lancé !");
        }
    };

    // Styles dynamiques pour la logique de hover (JS)
    const dynamicStyles = {
        forgotLink: {
            fontSize: '0.85rem',
            color: hoveredForgot ? '#2D89C8' : '#64748b',
            textDecoration: hoveredForgot ? 'underline' : 'none',
            cursor: 'pointer',
        },
        submitBtn: {
            backgroundColor: hoveredBtn ? '#1A4B7C' : '#2D89C8',
            color: '#ffffff',
            padding: '14px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '10px',
            transform: hoveredBtn ? 'translateY(-2px)' : 'none',
        },
        registerLink: {
            color: hoveredRegister ? '#2D89C8' : '#1A4B7C',
            fontWeight: 700,
            textDecoration: hoveredRegister ? 'underline' : 'none',
        }
    };

    return (
        <>
        <Header />
            <main className="connexion-main">
                <div className="connexion-card">
                    <h1 className="connexion-title">Connexion</h1>
                    <p className="connexion-subtitle">Connectez-vous à votre compte TaskFlow</p>
                    <form className="connexion-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <label className="input-label">Adresse e-mail</label>
                            <input
                                type="email"
                                placeholder="nom@exemple.com"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Mot de passe</label>
                            <input
                                type="password"
                                placeholder="••••••••••••"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="forgot-link-container">
                            <span
                                style={dynamicStyles.forgotLink}
                                onMouseEnter={() => setHoveredForgot(true)}
                                onMouseLeave={() => setHoveredForgot(false)}
                            >
                                Mot de passe oublié ?
                            </span>
                        </div>
                        <button
                            type="submit"
                            style={dynamicStyles.submitBtn}
                            onMouseEnter={() => setHoveredBtn(true)}
                            onMouseLeave={() => setHoveredBtn(false)}
                        >
                            Se connecter
                        </button>
                    </form>
                    <div className="divider-container">
                        <div className="divider-line"></div>
                        <span className="divider-text">ou</span>
                        <div className="divider-line"></div>
                    </div>
                    <p className="connexion-footer-text">
                        Vous n'avez pas de compte ?{' '}
                        <Link
                            to="/register"
                            style={dynamicStyles.registerLink}
                            onMouseEnter={() => setHoveredRegister(true)}
                            onMouseLeave={() => setHoveredRegister(false)}
                        >
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Connexion;