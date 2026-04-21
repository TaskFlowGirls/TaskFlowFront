import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, onDeleteTask }) => { // AJOUT : prop onDeleteTask
    const [timeLeft, setTimeLeft] = useState(task.temps || 1500);
    const [isRunning, setIsRunning] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        position: 'relative' // Utile pour positionner le bouton de suppression
    };

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task-card">
            <div className="task-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 className="task-title">{task.titre || task.nom}</h4>

                {/* BOUTON SUPPRIMER */}
                <button
                    className="btn-delete"
                    onPointerDown={(e) => e.stopPropagation()} // Bloque le drag
                    onClick={() => onDeleteTask(task.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4d', fontWeight: 'bold' }}
                >
                    ✕
                </button>
            </div>

            <div className="timer-section" onPointerDown={(e) => e.stopPropagation()}>
                <span className={`timer-display ${isRunning ? 'active' : ''}`}>
                    {formatTime(timeLeft)}
                </span>
                <button className={`btn-timer ${isRunning ? 'pause' : 'play'}`} onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? '⏸' : '▶'}
                </button>
            </div>

            <div className="card-footer">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(timeLeft / 1500) * 100}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;