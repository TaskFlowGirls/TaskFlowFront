import React, { useState } from 'react';
import '../styles/ModalAddCard.css';

const ModalAddCard = ({ isOpen, onClose, onAdd }) => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [dateButoire, setDateButoire] = useState('');
    const [tempsPrevu, setTempsPrevu] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ titre, description, dateButoire, tempsPrevu: parseInt(tempsPrevu) });
        setTitre('');
        setDescription('');
        setDateButoire('');
        setTempsPrevu(0);
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
                            placeholder="Ajoutez des détails sur la tâche..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Date butoire</label>
                            <input
                                type="date"
                                value={dateButoire}
                                onChange={(e) => setDateButoire(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Temps prévu (min)</label>
                            <input
                                type="number"
                                value={tempsPrevu}
                                onChange={(e) => setTempsPrevu(e.target.value)}
                            />
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