import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import hero from '../assets/hero.webp'; // Ton image par défaut
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fonction pour récupérer les projets depuis ton API (Back)
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Changement de 'projects' (anglais) en 'projets' (français)
                const response = await fetch('http://localhost:3000/api/projets');
                const data = await response.json();

                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    setProjects([]);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des projets:", error);
                setProjects([]);
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
                            <h1>Mes projets</h1>
                            <p>Gérez et organisez tous vos projets en un seul endroit</p>
                        </div>
                        <button className="btn-create-project">
                            <span>+</span> Créer un nouveau projet
                        </button>
                    </header>

                    {loading ? (
                        <p style={{ textAlign: 'center', color: '#64748b' }}>Chargement des projets...</p>
                    ) : (
                        <div className="projects-grid">
                            {/* Sécurité ajoutée ici : on vérifie que c'est un tableau avant le .map */}
                            {Array.isArray(projects) && projects.length > 0 ? (
                                projects.map((project) => (
                                    <div key={project.id} className="project-card">
                                        <div className="project-preview">
                                            <span className="project-badge">{project.type || 'Solo'}</span>

                                            {/* Logique d'affichage de l'image */}
                                            <img
                                                src={project.image_url ? project.image_url : hero}
                                                alt={project.title}
                                                className="project-img"
                                                onError={(e) => { e.target.src = hero }} // Sécurité si l'URL BDD est morte
                                            />
                                        </div>
                                        <div className="project-footer">
                                            <h3>{project.title}</h3>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', color: '#64748b', gridColumn: '1 / -1' }}>
                                    Aucun projet à afficher pour le moment.
                                </p>
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