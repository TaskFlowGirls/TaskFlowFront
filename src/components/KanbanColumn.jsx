import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core'; // AJOUT pour le drag inter-colonnes
import TaskCard from './TaskCard';

const KanbanColumn = ({ title, tasks, icon, id, onDeleteTask }) => {
    // On rend la colonne "Droppable" pour que dnd-kit sache qu'on peut lâcher des cartes ici
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className="kanban-column">
            <div className="column-header">
                <span>{icon} {title}</span>
                <span className="count-badge">{tasks.length}</span>
            </div>

            <div className="column-content">
                <SortableContext
                    items={tasks.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDeleteTask={onDeleteTask}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};

export default KanbanColumn;