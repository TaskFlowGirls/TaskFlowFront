import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import KanbanBoard from '../components/KanbanBoard';
import ModalAddCard from '../components/ModalAddCard';
import toast from 'react-hot-toast';
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
                        id: t.id_taches,
                        titre: t.nom_taches,
                        statut: String(t.statut_taches || "À faire").trim(),
                        description: t.description_taches || "",
                        date_debut: t.date_debut_taches || "",
                        date_fin: t.date_fin_taches || "",
                        date_butoire: t.date_butoire || "",
                        temps_prevu: Number(t.temps_prevu_taches) || 0,
                        temps_reel: Number(t.temps_reel_taches) || 0
                    }));
                    setTaches(formattedTasks);
                }
            } catch (error) {
                console.error("Erreur chargement:", error);
                toast.error("Impossible de charger les tâches");
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
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_projet: Number(cleanId) })
            });
            if (response.ok) {
                setTaches(prev => prev.filter(t => t.id !== tacheId));
                toast.success("Tâche supprimée 🗑️");
            } else {
                toast.error("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur suppression:", error);
            toast.error("Erreur réseau");
        }
    };

    // 3. Mise à jour d'une tâche (Statut, Timer, Date Fin)
    const handleUpdateTache = async (tacheId, modifications) => {
        console.log("DEBUG ProjetDetail - Modifications reçues :", modifications);
        try {
            const token = localStorage.getItem('token');

            const bodyData = {
                statutTaches: modifications.statutTaches,
                tempsReelTaches: modifications.tempsReelTaches,
                dateFinTaches: modifications.dateFinTaches
            };

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
                        temps_reel: modifications.tempsReelTaches ? Number(modifications.tempsReelTaches) : t.temps_reel,
                        statut: modifications.statutTaches || t.statut,
                        date_fin: modifications.dateFinTaches || t.date_fin
                    } : t
                ));
                // On ne met un toast success que si ce n'est pas un drag & drop (optionnel)
                if (modifications.tempsReelTaches) toast.success("Progression enregistrée !");
            }
        } catch (error) {
            console.error("Erreur mise à jour:", error);
            toast.error("Erreur de synchronisation");
        }
    };

    // 4. Ajout d'une nouvelle tâche
    const ajouterTache = async (infosTache) => {
        try {
            const token = localStorage.getItem('token');

            console.log("Valeur brute reçue du formulaire :", infosTache.dateButoire);

            const response = await fetch(`http://localhost:3000/api/taches/projet/${cleanId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nom_taches: infosTache.titre,
                    description_taches: infosTache.description || "",
                    date_butoire: infosTache.dateButoire,
                    date_debut_taches: infosTache.dateDebut,
                    date_fin_taches: infosTache.dateFin,
                    temps_prevu_taches: Number(infosTache.tempsPrevu) || 0,
                    id_projet: Number(cleanId),
                    statut_taches: 'À faire'
                }),
            });

            if (response.ok) {
                const dataCreated = await response.json();

                const nouvelleTache = {
                    id: dataCreated.id_taches,
                    titre: infosTache.titre,
                    statut: 'À faire',
                    description: infosTache.description || "",
                    date_butoire: infosTache.dateButoire || "",
                    temps_prevu: Number(infosTache.tempsPrevu) || 0,
                    temps_reel: 0
                };

                setTaches(prev => [...prev, nouvelleTache]);
                setIsModalOpen(false);
                toast.success("Nouvelle tâche créée ! 🚀");
            } else {
                toast.error("Erreur lors de la création");
            }
        } catch (error) {
            console.error("Erreur ajout:", error);
            toast.error("Erreur réseau");
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