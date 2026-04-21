import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Creer-projet.css';

const CreerProjet = () => {
    const [nom, setNom] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Récupère le jeton maintenant stocké

    const response = await fetch('http://localhost:3000/api/projets', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Le garde du backend verra enfin ce jeton
        },
        body: JSON.stringify({ nom_projet: nom }),
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