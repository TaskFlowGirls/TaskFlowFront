import React from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ taches, setTaches, onDeleteTask, onUpdateTask, idProjet }) => {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
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
            setTaches((prev) => prev.map(t => t.id === activeId ? { ...t, statut: newStatus } : t));
            try {
                const token = localStorage.getItem('token');
                await fetch(`http://localhost:3000/api/taches/${activeId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ statutTaches: newStatus, id_projet: Number(idProjet) })
                });
            } catch (error) { console.error("Erreur sauvegarde statut:", error); }
        } else if (activeId !== overId) {
            setTaches((items) => {
                const oldIndex = items.findIndex((t) => t.id === activeId);
                const newIndex = items.findIndex((t) => t.id === overId);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="kanban-board">
                {['À faire', 'En cours', 'Terminé'].map((status) => (
                    <KanbanColumn
                        key={status}
                        id={status}
                        title={status}
                        icon={status === 'À faire' ? '🎯' : status === 'En cours' ? '⚡' : '✅'}
                        tasks={(Array.isArray(taches) ? taches : []).filter(t => String(t.statut || "").trim() === status)}
                        onDeleteTask={onDeleteTask}
                        // IMPORTANT : On passe bien onUpdateTask ici pour qu'il arrive dans TaskCard
                        onUpdateTask={onUpdateTask}
                    />
                ))}
            </div>
        </DndContext>
    );
};

export default KanbanBoard;