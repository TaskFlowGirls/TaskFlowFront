import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/inscription.css';

const Inscription = () => {
    // ÉTATS : Gestion des hovers et de la checkbox
    const [hoveredBtn, setHoveredBtn] = useState(false);
    const [hoveredLogin, setHoveredLogin] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);

    // ÉTATS : Champs du formulaire
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        const userData = { nom, prenom, email, password };

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = "/";
            } else {
                alert(data.message || "Erreur lors de l'inscription");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Le serveur ne répond pas. Vérifie qu'il est bien lancé !");
        }
    };

    // Styles dynamiques pour la logique JS
    const dynamicStyles = {
        checkboxContainer: {
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            backgroundColor: '#f8fafc',
            padding: '15px',
            borderRadius: '6px',
            marginTop: '10px',
            border: isAccepted ? '1px solid #2D89C8' : '1px solid transparent',
            transition: 'all 0.3s ease',
        },
        submitBtn: {
            backgroundColor: !isAccepted ? '#cbd5e1' : (hoveredBtn ? '#1A4B7C' : '#2D89C8'),
            color: '#ffffff',
            padding: '14px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: !isAccepted ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '10px',
            transform: (isAccepted && hoveredBtn) ? 'translateY(-2px)' : 'none',
        },
        loginLink: {
            color: hoveredLogin ? '#2D89C8' : '#1A4B7C',
            fontWeight: 700,
            textDecoration: hoveredLogin ? 'underline' : 'none',
            transition: 'all 0.2s ease',
        }
    };

    return (
        <>
            <main className="inscription-main">
                <div className="inscription-card">
                    <h1 className="inscription-title">Inscription</h1>
                    <p className="inscription-subtitle">Créez votre compte TaskFlow gratuitement</p>

                    <form className="inscription-form" onSubmit={handleRegister}>
                        <div className="inscription-row">
                            <div className="input-group">
                                <label className="input-label">Nom</label>
                                <input
                                    type="text" placeholder="Dupont" className="input-field" required
                                    value={nom} onChange={(e) => setNom(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Prénom</label>
                                <input
                                    type="text" placeholder="Marie" className="input-field" required
                                    value={prenom} onChange={(e) => setPrenom(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Adresse e-mail</label>
                            <input
                                type="email" placeholder="nom@exemple.com" className="input-field" required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Mot de passe</label>
                            <input
                                type="password" placeholder="••••••••••••" className="input-field" required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="help-text">Min. 12 caractères avec majuscule, minuscule, chiffre et caractère spécial</span>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Confirmation du mot de passe</label>
                            <input
                                type="password" placeholder="••••••••••••" className="input-field" required
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div style={dynamicStyles.checkboxContainer}>
                            <input
                                type="checkbox" style={{ marginTop: '4px', cursor: 'pointer' }}
                                checked={isAccepted} onChange={(e) => setIsAccepted(e.target.checked)}
                            />
                            <span className="checkbox-text">
                                J'accepte que mes données personnelles soient collectées conformément aux <Link to="/cgu" className="link-inline">CGU / RGPD</Link>
                            </span>
                        </div>

                        <button
                            type="submit" disabled={!isAccepted} style={dynamicStyles.submitBtn}
                            onMouseEnter={() => isAccepted && setHoveredBtn(true)}
                            onMouseLeave={() => setHoveredBtn(false)}
                        >
                            Créer mon compte
                        </button>
                    </form>

                    <div className="divider-container">
                        <div className="divider-line"></div>
                        <span className="divider-text">ou</span>
                        <div className="divider-line"></div>
                    </div>

                    <p className="inscription-footer-text">
                        Vous avez déjà un compte ?{' '}
                        <Link
                            to="/login" style={dynamicStyles.loginLink}
                            onMouseEnter={() => setHoveredLogin(true)}
                            onMouseLeave={() => setHoveredLogin(false)}
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </main>
        </>
    );
};

export default Inscription;