import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <>
            <Header />
            <main className="contact-main">
                <h1 className="contact-title">Contactez l'Équipe TaskFlow</h1>
                <p className="contact-subtitle">Une question ?  Notre équipe vous répond sous 24h.</p>

                {submitted && (
                    <div className="success-message">
                        ✅ Votre message a été envoyé avec succès.
                    </div>
                )}

                <div className="contact-flex-container">
                    {/* Bloc Formulaire */}
                    <form className="contact-form-card" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label" htmlFor="name">Nom complet</label>
                            <input
                                type="text" id="name" name="name" className="input-field"
                                value={formData.name} onChange={handleChange}
                                placeholder="Ex: Marie Dupont" required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="email">Adresse e-mail</label>
                            <input
                                type="email" id="email" name="email" className="input-field"
                                value={formData.email} onChange={handleChange}
                                placeholder="Ex: mariedupont@taskflow.fr" required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="subject">Sujet</label>
                            <input
                                type="text" id="subject" name="subject" className="input-field"
                                value={formData.subject} onChange={handleChange}
                                placeholder="Ex: Demande de support"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="message">Votre message</label>
                            <textarea
                                id="message" 
                                name="message" 
                                className="input-field textarea-field"
                                value={formData.message} 
                                onChange={handleChange}
                                placeholder="Détaillez votre demande ici..."
                                required
                            />
                        </div>

                        <div className="rgpd-container-fixed">
                            <input
                                type="checkbox"
                                name="acceptedTerms"
                                id="acceptedTerms"
                                checked={formData.acceptedTerms}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="acceptedTerms">
                                J'accepte les <a href='/cgu' target='_blank'>CGU / RGPD</a>
                            </label>                        
                        </div>

                        <button type="submit" className="submit-btn">
                            Envoyer le message
                        </button>
                    </form>

                    {/* Colonne d'infos sur le côté */}
                    <div className="contact-info-column">
                        <div className="contact-info-card">
                            <h3>Nos bureaux</h3>
                            <p>123 Allée de l'Innovation</p>
                            <p>75001 Paris, France</p>
                        </div>

                        <div className="contact-info-card">
                            <h3>Support Technique</h3>
                            <p>support@taskflow.fr</p>
                            <p>+33 1 23 45 67 89</p>
                        </div>

                        <div className="contact-info-card">
                            <h3>Réseaux Sociaux</h3>
                            <p>LinkedIn: /company/taskflow-pro</p>
                            <p>Twitter: @TaskFlow_App</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Contact;