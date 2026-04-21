import React from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ taches, setTaches, onDeleteTask, idProjet }) => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // SÉCURITÉ : Si l'ID est undefined, on arrête tout pour éviter la 404
        if (!activeId || activeId === "undefined") {
            console.error("L'ID de la tâche est indéfini. Vérifiez le mapping dans ProjetDetail.");
            return;
        }

        const activeTask = taches.find(t => t.id === activeId);
        if (!activeTask) return;

        const overTask = taches.find(t => t.id === overId);
        // On récupère le statut soit de la tâche survolée, soit de la colonne (id)
        const newStatus = overTask ? overTask.statut : overId;

        const validStatuses = ['À faire', 'En cours', 'Terminé'];

        if (validStatuses.includes(newStatus) && activeTask.statut !== newStatus) {
            // 1. Update local immédiat
            setTaches((prev) => prev.map(t =>
                t.id === activeId ? { ...t, statut: newStatus } : t
            ));

            // 2. Update BDD
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:3000/api/taches/${activeId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        // CORRECTION : On utilise les noms exacts de ta BDD (avec _)
                        statut_taches: newStatus,
                        id_projet: Number(idProjet),
                        temps_reel_taches: activeTask.temps_reel || "0"
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Erreur serveur détaillée:", errorData.message);
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour du statut:", error);
            }
        } else if (active.id !== over.id) {
            setTaches((items) => {
                const oldIndex = items.findIndex((t) => t.id === active.id);
                const newIndex = items.findIndex((t) => t.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <div className="kanban-board">
                <KanbanColumn
                    id="À faire"
                    title="À faire"
                    icon="🎯"
                    tasks={taches.filter(t => t.statut === 'À faire')}
                    onDeleteTask={onDeleteTask}
                />
                <KanbanColumn
                    id="En cours"
                    title="En cours"
                    icon="⚡"
                    tasks={taches.filter(t => t.statut === 'En cours')}
                    onDeleteTask={onDeleteTask}
                />
                <KanbanColumn
                    id="Terminé"
                    title="Terminé"
                    icon="✅"
                    tasks={taches.filter(t => t.statut === 'Terminé')}
                    onDeleteTask={onDeleteTask}
                />
            </div>
        </DndContext>
    );
};

export default KanbanBoard;