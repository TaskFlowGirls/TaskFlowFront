import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Inscription from './pages/Inscription';
import Connexion from "./pages/Connexion.jsx";
import CGU from './pages/CGU';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Projets from './components/Projets.jsx';
import CreerProjet from './pages/Creer-projets.jsx';
import ProjetDetail from './pages/ProjetDetail';
import InviteModal from './components/InviteModal.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />

            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/register" element={<Inscription />} />
                <Route path="/login" element={<Connexion />} />
                <Route path="/cgu" element={<CGU />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/creer-projets' element={<CreerProjet />} />
                <Route path='/projets' element={<Projets />} />
                <Route path="/projet/:id" element={<ProjetDetail />} />
                <Route path='/invite-modal' element={<InviteModal />} />
            </Routes>
        </>
    );
}

export default App;