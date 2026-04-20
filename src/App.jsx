import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Inscription from './pages/Inscription';
import Connexion from "./pages/Connexion.jsx";
import CGU from './pages/CGU';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/register" element={<Inscription />} />
                <Route path="/login" element={<Connexion />} />
                <Route path="/cgu" element={<CGU />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;