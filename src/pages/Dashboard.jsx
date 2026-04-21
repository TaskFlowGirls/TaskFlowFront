// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Projets from '../components/Projets';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/projets');
                const data = await response.json();
                setProjects(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erreur API Projets:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

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
                        <Link to="./components/Projets.jsx" className="btn-create-project">
                            + Créer un nouveau Projet
                        </Link>
                    </header>

                    {loading ? (
                        <div className="loading-state">Chargement de vos projets...</div>
                    ) : (
                        <div className="projects-grid">
                            {projects.length > 0 ? (
                                projects.map((projet) => (
                                    <Projets key={projet.id_projet} projet={projet} />
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