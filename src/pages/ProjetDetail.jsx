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

    // 1. Chargement des tâches
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
                        titre: t.nom_taches,
                        statut: t.statut_taches,
                        description: t.description_taches,
                        date_debut: t.date_debut_taches,
                        date_fin: t.date_fin_taches,
                        date_butoire: t.date_butoire,
                        temps_prevu: t.temps_prevu_taches,
                        temps_reel: Number(t.temps_reel_taches) || 0
                    }));
                    setTaches(formattedTasks);
                }
            } catch (error) {
                console.error("Erreur chargement:", error);
            }
        };
        if (cleanId) fetchTaches();
    }, [cleanId]);

    // 2. Suppression d'une tâche
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

    // 3. Mise à jour d'une tâche (Timer, Date de fin)
    const handleUpdateTache = async (tacheId, modifications) => {
        try {
            const token = localStorage.getItem('token');

            const bodyData = {
                id_projet: Number(cleanId)
            };

            if (modifications.temps_reel_taches) bodyData.temps_reel_taches = modifications.temps_reel_taches;
            if (modifications.date_fin_taches) bodyData.date_fin_taches = modifications.date_fin_taches;
            if (modifications.statut_taches) bodyData.statut_taches = modifications.statut_taches;

            const response = await fetch(`http://localhost:3000/api/taches/${tacheId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyData)
            });

            if (response.ok) {
                setTaches(prev => prev.map(t =>
                    t.id === tacheId ? {
                        ...t,
                        temps_reel: modifications.temps_reel_taches ? Number(modifications.temps_reel_taches) : t.temps_reel,
                        date_fin: modifications.date_fin_taches || t.date_fin,
                        statut: modifications.statut_taches || t.statut
                    } : t
                ));
            } else {
                console.error("Le serveur a refusé l'enregistrement");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    // 4. Ajout d'une nouvelle tâche
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
                    description_taches: infosTache.description || "",
                    date_debut_taches: infosTache.dateDebut || "",
                    date_fin_taches: "",
                    temps_prevu_taches: Number(infosTache.tempsPrevu),
                    temps_reel_taches: "0",
                    date_butoire: infosTache.dateButoire || "",
                    id_projet: Number(cleanId)
                }),
            });

            if (response.ok) {
                const result = await response.json();

                // On s'assure d'utiliser les mêmes noms de clés que dans le useEffect
                const nouvelleTacheLocal = {
                    id: result.id_taches, // On récupère l'ID réel de la BDD Lisa
                    titre: infosTache.titre,
                    statut: 'À faire',
                    description: infosTache.description || "",
                    date_debut: infosTache.dateDebut || "",
                    date_fin: "",
                    date_butoire: infosTache.dateButoire || "",
                    temps_prevu: Number(infosTache.tempsPrevu),
                    temps_reel: 0
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
                    onUpdateTask={handleUpdateTache}
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