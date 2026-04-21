// src/components/Projets.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '../assets/hero.webp';
import '../styles/Projets.css';

const Projets = ({ projet }) => {
    const navigate = useNavigate();

    // On utilise la donnée calculée par ton ProjetsController.js
    const avancement = projet.pourcentage_avancement || 0;

    return (
        <div
            className="project-card"
            onClick={() => navigate(`/projet/${projet.id_projet}`)}
        >
            <div className="project-preview">
                {/* Badge Type (Solo/Équipe) */}
                <span className="project-badge">{projet.type_projet}</span>

                <img
                    src={projet.image_url ? projet.image_url : hero}
                    alt={projet.nom_projet}
                    className="project-img"
                    onError={(e) => { e.target.src = hero }}
                />
            </div>

            <div className="project-footer-content">
                <div className="project-info">
                    <h3>{projet.nom_projet}</h3>
                    <p className="project-status">{projet.statut_projet}</p>
                </div>

                {/* Barre de progression conforme à ta maquette Figma */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${avancement}%` }}
                        ></div>
                    </div>
                    <span className="progress-percentage">{avancement}%</span>
                </div>
            </div>
        </div>
    );
};

export default Projets;