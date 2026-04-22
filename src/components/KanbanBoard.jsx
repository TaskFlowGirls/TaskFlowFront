import React from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ taches, setTaches, onDeleteTask, onUpdateTask, idProjet }) => {
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

        const activeTask = taches.find(t => t.id === activeId);
        if (!activeTask) return;

        const overTask = taches.find(t => t.id === overId);
        const newStatus = overTask ? overTask.statut : overId;

        const validStatuses = ['À faire', 'En cours', 'Terminé'];

        if (validStatuses.includes(newStatus) && activeTask.statut !== newStatus) {
            // 1. Update UI
            setTaches((prev) => prev.map(t =>
                t.id === activeId ? { ...t, statut: newStatus } : t
            ));

            // 2. Update BDD avec TES noms de colonnes
            try {
                const token = localStorage.getItem('token');
                await fetch(`http://localhost:3000/api/taches/${activeId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({
                        statut_taches: newStatus, // Sauvegarde réelle
                        id_projet: Number(idProjet)
                    })
                });
            } catch (error) {
                console.error("Erreur sauvegarde statut:", error);
            }
        } else if (active.id !== over.id) {
            setTaches((items) => {
                const oldIndex = items.findIndex((t) => t.id === active.id);
                const newIndex = items.findIndex((t) => t.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // Sécurité : On s'assure que taches est bien un tableau avant de filtrer
    const safeTaches = Array.isArray(taches) ? taches : [];

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
                    tasks={safeTaches.filter(t => String(t.statut || "").trim() === 'À faire')}
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                />
                <KanbanColumn
                    id="En cours"
                    title="En cours"
                    icon="⚡"
                    tasks={safeTaches.filter(t => String(t.statut || "").trim() === 'En cours')}
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                />
                <KanbanColumn
                    id="Terminé"
                    title="Terminé"
                    icon="✅"
                    tasks={safeTaches.filter(t => String(t.statut || "").trim() === 'Terminé')}
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                />
            </div>
        </DndContext>
    );
};

export default KanbanBoard;