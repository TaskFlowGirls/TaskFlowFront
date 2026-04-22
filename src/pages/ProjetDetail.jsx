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
            }
        };
        if (cleanId) fetchTaches();
    }, [cleanId]);

    const handleSupprimerTache = async (tacheId) => {
        if (!window.confirm("Supprimer cette tâche ?")) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/taches/${tacheId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_projet: Number(cleanId) })
            });
            if (response.ok) setTaches(prev => prev.filter(t => t.id !== tacheId));
        } catch (error) {
            console.error("Erreur suppression:", error);
        }
    };

    
    const handleUpdateTache = async (tacheId, modifications) => {
        console.log("DEBUG ProjetDetail - Modifications reçues :", modifications);
    try {
        const token = localStorage.getItem('token');
        
        const bodyData = {
            statutTaches: modifications.statutTaches,
            tempsReelTaches: modifications.tempsReelTaches,
            dateFinTaches: modifications.dateFinTaches // Assure-toi que c'est bien ce nom
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
                    date_fin: modifications.dateFinTaches || t.date_fin // AJOUTE CETTE LIGNE
                } : t
            ));
        }
    } catch (error) {
        console.error("Erreur mise à jour:", error);
    }
};

    // 4. Ajout d'une nouvelle tâche avec formatage de date pour Supabase
    const ajouterTache = async (infosTache) => {
        try {
            const token = localStorage.getItem('token');
            
            // Formatage date: transforme 'jj/mm/aaaa' ou 'aaaa-mm-jj' en 'aaaa-mm-jj'
            const formatDate = (date) => {
                if (!date) return null;
                // Si c'est déjà formaté yyyy-mm-dd, on retourne tel quel
                if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
                // Sinon on reformate
                const [day, month, year] = date.split('/');
                return `${year}-${month}-${day}`;
            };
            console.log("Valeur brute reçue du formulaire :", infosTache.dateButoire);
            console.log("Valeur après formatage :", formatDate(infosTache.dateButoire));
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
                    id_projet: Number(cleanId)
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
            }
        } catch (error) {
            console.error("Erreur ajout:", error);
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