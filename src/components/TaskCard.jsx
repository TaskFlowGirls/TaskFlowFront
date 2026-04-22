import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, onDeleteTask, onUpdateTask }) => {
    const [timeLeft, setTimeLeft] = useState(task.temps_reel > 0 ? task.temps_reel : task.temps_prevu || 0);
    const [isRunning, setIsRunning] = useState(false);
    const [isOvertime, setIsOvertime] = useState(task.temps_reel > 0 || task.temps_prevu === 0);
    const [dateFin, setDateFin] = useState(task.date_fin || '');

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 0 && !isOvertime) {
                        setIsOvertime(true);
                        return 1;
                    }
                    return isOvertime ? prev + 1 : prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, isOvertime]);

    const handleSaveData = (e) => {
        e.stopPropagation();
        // Correction : on vérifie que c'est bien une fonction
        if (typeof onUpdateTask === 'function') {
            const modifications = {
                date_fin_taches: dateFin,
                temps_reel_taches: isOvertime ? timeLeft.toString() : "0"
            };
            onUpdateTask(task.id, modifications);
            alert("Temps enregistré !");
        }
    };

    const formatTime = (totalSeconds) => {
        const absSeconds = Math.abs(totalSeconds);
        const h = Math.floor(absSeconds / 3600);
        const m = Math.floor((absSeconds % 3600) / 60);
        const s = absSeconds % 60;
        const hoursPart = h > 0 ? `${h}h ` : '';
        return `${hoursPart}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }} {...attributes} {...listeners} className={`task-card ${isOvertime ? 'overtime' : ''}`}>
            <div className="task-card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 className="task-title">{task.titre}</h4>
                <button onPointerDown={(e) => e.stopPropagation()} onClick={() => onDeleteTask(task.id)} className="btn-delete">✕</button>
            </div>

            <div className="task-details" style={{fontSize: '0.75rem', margin: '10px 0'}}>
                <p><strong>Début :</strong> {task.date_debut || 'Non définie'}</p>
                <div onPointerDown={(e) => e.stopPropagation()}>
                    <label><strong>Fin :</strong> </label>
                    <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} style={{fontSize: '0.75rem'}} />
                </div>
                <p><strong>Butoire :</strong> {task.date_butoire || 'Non définie'}</p>
                <p><strong>Prévu :</strong> {formatTime(task.temps_prevu)}</p>
                <p style={{color: '#ef4444'}}><strong>Réel enregistré :</strong> {formatTime(task.temps_reel)}</p>
            </div>

            <div className="timer-section" onPointerDown={(e) => e.stopPropagation()}>
                <span className="timer-label" style={{fontSize: '0.8rem'}}>
                    {isOvertime ? "Dépassement :" : "Temps restant :"}
                </span>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px'}}>
                    <span className="timer-display" style={{ color: isOvertime ? '#ef4444' : 'inherit', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {formatTime(timeLeft)}
                    </span>
                    <button onClick={() => setIsRunning(!isRunning)}>
                        {isRunning ? '⏸' : '▶'}
                    </button>

                    {!isRunning && (
                        <button
                            onClick={handleSaveData}
                            style={{backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.7rem', cursor: 'pointer'}}
                        >
                            💾 Enregistrer
                        </button>
                    )}
                </div>
            </div>

            <div className="progress-bar" style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
                <div className="progress-fill" style={{ width: isOvertime ? '100%' : `${(timeLeft / (task.temps_prevu || 1)) * 100}%`, backgroundColor: isOvertime ? '#ef4444' : '#3b82f6', height: '100%' }}></div>
            </div>
        </div>
    );
};

export default TaskCard;