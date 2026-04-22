import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const KanbanColumn = ({ title, tasks, icon, id, onDeleteTask, onUpdateTask }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className="kanban-column">
            <div className="column-header">
                <div className="column-title-wrapper">
                    <span className="column-icon">{icon}</span>
                    <span className="column-title-text">{title}</span>
                </div>
                <span className="count-badge">{tasks.length}</span>
            </div>

            <div className="column-content">
                <SortableContext
                    items={tasks.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="task-list-container">
                        {tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDeleteTask={onDeleteTask}
                                onUpdateTask={onUpdateTask}
                            />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
};

export default KanbanColumn;