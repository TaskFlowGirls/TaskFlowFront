import React, { useState, useEffect } from 'react';
import '../styles/MonCompte.css';

const MonCompte = () => {
    const [user, setUser] = useState({ nom: '', email: '' });
    const [projets, setProjets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                // 1. Récupération des projets via la route existante /api/projets
                const projRes = await fetch('http://localhost:3000/api/projets', { 
                    headers: { 'Authorization': `Bearer ${token}` } 
                });

                // 2. Récupération profil (Attention : cette route doit exister dans ton backend)
                const userRes = await fetch('http://localhost:3000/api/auth/profil', { 
                    headers: { 'Authorization': `Bearer ${token}` } 
                });

                if (userRes.ok) setUser(await userRes.json());
                if (projRes.ok) {
                    const data = await projRes.json();
                    setProjets(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Erreur de récupération :", error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteAccount = async () => {
        if (!window.confirm("Supprimer ton compte ?")) return;
        const token = localStorage.getItem('token');
        // Route de suppression à adapter selon ton backend
        const res = await fetch('http://localhost:3000/api/auth/delete', {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };

    return (
        <div className="mon-compte-container">
            <h1>Mon Compte</h1>

            <section>
                <h2>Mes informations</h2>
                <form>
                    <input value={user.nom || ''} onChange={e => setUser({...user, nom: e.target.value})} placeholder="Nom" />
                    <input value={user.email || ''} onChange={e => setUser({...user, email: e.target.value})} placeholder="Email" />
                    <button type="button">Sauvegarder</button>
                </form>
            </section>

            <section>
                <h2>Mes projets ({projets.length})</h2>
                <ul>
                    {projets && projets.length > 0 ? (
                        projets.map((projet) => (
                            <div key={projet.id_projet} className="projet-card">
                                <h3>{projet.nom_projet || "Projet sans nom"}</h3>
                                <p>{projet.description_projet || "Pas de description"}</p>
                                <span>Avancement : {projet.pourcentage_avancement}%</span>
                            </div>
                        ))
                    ) : (
                        <p>Aucun projet à afficher.</p>
                    )}
                </ul>
            </section>

            <button className="btn-danger" onClick={handleDeleteAccount}>Supprimer mon compte</button>
        </div>
    );
};

export default MonCompte;