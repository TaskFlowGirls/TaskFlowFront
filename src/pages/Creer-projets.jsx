import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Creer-projet.css';

const CreerProjet = () => {
    const navigate = useNavigate();

    const [nom, setNom] = useState('');
    const [type, setType] = useState(''); // Ajoute ça
    const [description, setDescription] = useState(''); // Ajoute ça

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/api/projets', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        // Envoie TOUS les champs attendus par ton Backend
        body: JSON.stringify({ 
            nomProjet: nom, 
            typeProjet: type, 
            descriptionProjet: description 
        }),
    });

    if (response.ok) {
        navigate('/dashboard');
    } else {
        alert("Erreur lors de la création");
    }
};

    return (
        <>
            <Header />
            <main className='main-creation'>
                <h2>Créer un nouveau projet</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nom du projet :</label>
                    <input
                        type='text'
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />

                    <label>Type du projet :</label>
                    <input
                        type='text'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />

                    <label>Description :</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <button type='submit' className="btn-create-project">
                        Enregistrer
                    </button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default CreerProjet;