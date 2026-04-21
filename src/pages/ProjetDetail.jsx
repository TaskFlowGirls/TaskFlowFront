import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/ProjetDetail.css';

const ProjetDetail = () => {
    const { id } = useParams();
    const [nomProjet, setNomProjet] = useState("Mon Projet TaskFlow");

    // Simulation de données (à remplacer par un fetch vers ton API taches plus tard)
    const [taches, setTaches] = useState([
        { id: 1, titre: "Design de l'interface", statut: "todo", temps: 1500 },
        { id: 2, titre: "Config Supabase", statut: "doing", temps: 600 },
        { id: 3, titre: "Correction Bugs Auth", statut: "done", temps: 0 }
    ]);

    return (
        <div className="projet-detail-container">
            <Header />

            <main className="kanban-main">
                <header className="kanban-header">
                    <div className="header-info">
                        <h1>{nomProjet}</h1>
                        <p className="task-count">{taches.length} tâches au total</p>
                    </div>
                    <button className="btn-add-task">+ Nouvelle Tâche</button>
                </header>

                <div className="kanban-board">
                    <Column title="À faire" icon="🎯" tasks={taches.filter(t => t.statut === 'todo')} />
                    <Column title="En cours" icon="⚡" tasks={taches.filter(t => t.statut === 'doing')} />
                    <Column title="Terminé" icon="✅" tasks={taches.filter(t => t.statut === 'done')} />
                </div>
            </main>
        </div>
    );
};

const Column = ({ title, tasks, icon }) => (
    <div className="kanban-column">
        <div className="column-header">
            <span>{icon} {title}</span>
            <span className="count-badge">{tasks.length}</span>
        </div>
        <div className="column-content">
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
    </div>
);

const TaskCard = ({ task }) => {
    const [timeLeft, setTimeLeft] = useState(task.temps);
    const [isRunning, setIsRunning] = useState(false);

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
        <div className="task-card">
            <h4 className="task-title">{task.titre}</h4>

            <div className="timer-section">
                <span className={`timer-display ${isRunning ? 'active' : ''}`}>
                    {formatTime(timeLeft)}
                </span>
                <button
                    className={`btn-timer ${isRunning ? 'pause' : 'play'}`}
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? '⏸' : '▶'}
                </button>
            </div>

            <div className="card-footer">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(timeLeft/1500)*100}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProjetDetail;