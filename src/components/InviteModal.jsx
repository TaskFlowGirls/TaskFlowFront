import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const InviteMember = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus]= useState('idle');

    const handleInvite = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const templateParams = {
            name: "Pae",
            project_name: "TaskFlow",
            message: "Voici ton invitation pour rejoindre le projet !"
        }
        try {
            await emailjs.send(
                'service_d8kyixh', // Service ID
                'template_p8ez1c9', // Template ID
                templateParams,
                'Oo228VY4aXT2oARqC'
            );
        } catch (err) {
            console.error("Erreur lors de l'envoi :", err);
            setStatus('error');
        }
    };

    return (
        <div className='invite-container'>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email du collaborateur"
            />
            <button onClick={handleInvite} disabled={status === 'loading'}>
                {status === 'loading' ? 'Envoi...' : 'Inviter'}
            </button>
            {status === 'success' && <p>Invitation envoyée !</p>}
        </div>
    );
};

export default InviteMember;