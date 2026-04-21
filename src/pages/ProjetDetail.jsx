import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import KanbanBoard from '../components/KanbanBoard';
import ModalAddCard from '../components/ModalAddCard';
import '../styles/ProjetDetail.css';

const ProjetDetail = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taches, setTaches] = useState([]);

    const cleanId = id.replace(':', '');

    // 1. Charger les tâches (on adapte le mapping aux noms de la BDD)
    useEffect(() => {
        const fetchTaches = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/api/taches/projet/${cleanId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    const formattedTasks = data.map(t => ({
                        ...t,
                        id: t.id_taches,
                        titre: t.nom_taches, // On utilise les noms de ta BDD
                        statut: t.statut_taches,
                        description: t.description_taches,
                        date_butoire: t.date_butoire,
                        temps_prevu: t.temps_prevu_taches
                    }));
                    setTaches(formattedTasks);
                }
            } catch (error) {
                console.error("Erreur chargement:", error);
            }
        };
        if (cleanId) fetchTaches();
    }, [cleanId]);

    // 2. Supprimer une tâche
    const handleSupprimerTache = async (tacheId) => {
        if (!window.confirm("Supprimer cette tâche ?")) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/taches/${tacheId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_projet: Number(cleanId) })
            });
            if (response.ok) {
                setTaches(prev => prev.filter(t => t.id !== tacheId));
            }
        } catch (error) {
            console.error("Erreur suppression:", error);
        }
    };

    // 3. Ajouter une tâche (BIEN VÉRIFIER LE ASYNC ICI)
    const ajouterTache = async (infosTache) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/taches/projet/${cleanId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nom_taches: infosTache.titre,
                    statut_taches: 'À faire',
                    description_taches: infosTache.description,
                    date_butoire: infosTache.dateButoire,
                    temps_prevu_taches: infosTache.tempsPrevu,
                    id_projet: Number(cleanId)
                }),
            });

            if (response.ok) {
                const result = await response.json();
                const nouvelleTacheLocal = {
                    id: result.id_taches,
                    titre: infosTache.titre,
                    statut: 'À faire',
                    description: infosTache.description,
                    date_butoire: infosTache.dateButoire,
                    temps_prevu: infosTache.tempsPrevu
                };
                setTaches(prev => [...prev, nouvelleTacheLocal]);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Erreur création:", error);
        }
    };

    return (
        <div className="projet-detail-container">
            <Header />
            <main className="kanban-main">
                <header className="kanban-header">
                    <h1>Tableau de bord</h1>
                    <button className="btn-add-task" onClick={() => setIsModalOpen(true)}>
                        + Nouvelle Tâche
                    </button>
                </header>

                <KanbanBoard
                    taches={taches}
                    setTaches={setTaches}
                    onDeleteTask={handleSupprimerTache}
                    idProjet={cleanId}
                />
            </main>

            <ModalAddCard
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={ajouterTache}
            />
        </div>
    );
};

export default ProjetDetail;