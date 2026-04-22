import React, { useState } from 'react';
import '../styles/ModalAddCard.css';

const ModalAddCard = ({ isOpen, onClose, onAdd }) => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateButoire, setDateButoire] = useState('');
    const [heures, setHeures] = useState(0);
    const [minutes, setMinutes] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalSecondes = (parseInt(heures || 0) * 3600) + (parseInt(minutes || 0) * 60);

        onAdd({
            titre,
            description,
            dateDebut,
            dateButoire,
            tempsPrevu: totalSecondes
        });

        setTitre('');
        setDescription('');
        setDateDebut('');
        setDateButoire('');
        setHeures(0);
        setMinutes(0);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Créer une nouvelle tâche</h2>
                    <button className="close-x" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nom de la tâche</label>
                        <input
                            type="text"
                            placeholder="Ex: Designer la page d'accueil"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Détails de la tâche..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="modal-time-row">
                        <div className="form-group">
                            <label>Date de début</label>
                            <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Date butoire</label>
                            <input type="date" value={dateButoire} onChange={(e) => setDateButoire(e.target.value)} />
                        </div>
                    </div>

                    <div className="modal-time-row">
                        <div className="form-group">
                            <label>Heures (Prévues)</label>
                            <input type="number" min="0" value={heures} onChange={(e) => setHeures(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Minutes</label>
                            <input type="number" min="0" max="59" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn-secondary">Annuler</button>
                        <button type="submit" className="btn-primary">Créer la tâche</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAddCard;