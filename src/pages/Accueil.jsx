import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import de Link ajouté
import Header from '../components/Header';
import Footer from '../components/Footer';
import hero from '../assets/hero.webp';
import kanbanImg from '../assets/icon_kanban.webp';
import collabImg from '../assets/icon_collab.webp';
import timeImg from '../assets/icon_timer.webp';
import pdfImg from '../assets/icon_pdf.webp';
import '../styles/accueil.css';

const Accueil = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredBtn, setHoveredBtn] = useState(null);

    // Uniquement les styles qui dépendent du JS (images dynamiques et hovers complexes)
    const dynamicStyles = {
        hero: {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${hero})`,
        },
        btnPrimary: {
            backgroundColor: hoveredBtn === 'primary' ? '#1A4B7C' : '#2D89C8',
            color: '#ffffff',
            padding: '12px 30px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: hoveredBtn === 'primary' ? 'translateY(-2px)' : 'none',
            display: 'inline-block', // Assure un bon rendu avec Link
            textDecoration: 'none', // Enlève le soulignement du Link
        },
        btnSecondary: {
            backgroundColor: hoveredBtn === 'secondary' ? '#f4f7f9' : 'transparent',
            color: '#1A4B7C',
            padding: '12px 30px',
            borderRadius: '6px',
            border: hoveredBtn === 'secondary' ? '2px solid #1A4B7C' : '2px solid #2D89C8',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
        },
        card: (id) => ({
            boxShadow: hoveredCard === id ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
            transform: hoveredCard === id ? 'translateY(-8px)' : 'none',
            borderColor: hoveredCard === id ? '#2D89C8' : '#e2e8f0',
        })
    };

    const features = [
        { id: 1, img: kanbanImg, title: "Tableau Kanban", text: "Visualisez vos tâches en colonnes À faire, En cours et Terminé. Déplacez-les par glisser-déposer." },
        { id: 2, img: collabImg, title: "Collaboration", text: "Invitez vos collaborateurs par email et travaillez ensemble en temps réel sur vos projets." },
        { id: 3, img: timeImg, title: "Suivi des temps", text: "Estimez et suivez le temps prévu et réel pour chaque tâche. Optimisez votre productivité." },
        { id: 4, img: pdfImg, title: "Export PDF", text: "Exportez vos tableaux Kanban en PDF pour les partager ou les archiver facilement." }
    ];

    return (
        <div className="accueil-page">
            <Header />
            <main>
                <section className="hero-section" style={dynamicStyles.hero}>
                    <h1 className="hero-title">Organisez vos projets avec simplicité</h1>
                    <p className="hero-text">
                        TaskFlow est votre gestionnaire de tâches collaboratif. Créez, partagez et
                        suivez vos projets en temps réel avec votre équipe.
                    </p>
                    <div className="hero-btn-group">
                        {/* Changement du bouton par un Link pour le Dashboard */}
                        <Link
                            to="/dashboard"
                            style={dynamicStyles.btnPrimary}
                            onMouseEnter={() => setHoveredBtn('primary')}
                            onMouseLeave={() => setHoveredBtn(null)}
                        >
                            Commencer
                        </Link>
                        <button
                            style={dynamicStyles.btnSecondary}
                            onMouseEnter={() => setHoveredBtn('secondary')}
                            onMouseLeave={() => setHoveredBtn(null)}
                        >
                            En savoir plus
                        </button>
                    </div>
                </section>

                <section className="features-section">
                    <h2 className="features-title">Fonctionnalités clés</h2>
                    <div className="features-grid">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="feature-card"
                                style={dynamicStyles.card(feature.id)}
                                onMouseEnter={() => setHoveredCard(feature.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <img src={feature.img} alt="" className="card-icon" />
                                <h3 className="card-title">{feature.title}</h3>
                                <p className="card-text">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Accueil;