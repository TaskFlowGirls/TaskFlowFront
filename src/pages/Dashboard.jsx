// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Projets from '../components/Projets';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate(); // AJOUT : Initialisation du hook de navigation
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            // 1. On récupère le badge (token) depuis la poche (localStorage)
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:3000/api/projets', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 2. On presents le badge ici
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    // Si le serveur répond autre chose que 200, on lance une erreur
                    throw new Error('Erreur lors de la récupération des projets');
                }

                const data = await response.json();
                setProjects(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erreur API Projets:", error);
                // C'est cette erreur qui s'affiche dans ta console
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // AJOUT : Fonction pour gérer le clic et rediriger
    const handleProjectClick = (id) => {
        navigate(`/projet/${id}`);
    };

    return (
        <>
            <Header />
            <main className="dashboard-main">
                <div className="dashboard-container">
                    <header className="dashboard-header">
                        <div className="dashboard-title-area">
                            <h1>Mes Projets</h1>
                            <p>Gérez et organisez tous vos projets en un seul endroit</p>
                        </div>
                        <Link to="/creer-projets" className="btn-create-project">
                            + Créer un nouveau Projet
                        </Link>
                    </header>

                    {loading ? (
                        <div className="loading-state">Chargement de vos projets...</div>
                    ) : (
                        <div className="projects-grid">
                            {projects.length > 0 ? (
                                projects.map((projet) => (
                                    /* AJOUT : onClick pour la redirection et style pointer */
                                    <div
                                        key={projet.id_projet}
                                        onClick={() => handleProjectClick(projet.id_projet)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Projets projet={projet} />
                                    </div>
                                ))
                            ) : (
                                <p className="no-data">Aucun projet trouvé.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Dashboard;