import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/CGU.css';

const CGU = () => {
    return (
        <>
            <Header />
            <main className="cgu-main">
                <article className="cgu-card">
                    <h1 className="cgu-title">Conditions Générales d'Utilisation</h1>
                    <span className="cgu-date">Dernière mise à jour : 20 avril 2026</span>

                    <div className="cgu-content">
                        <h2>1. Objet</h2>
                        <p>
                            Les présentes Conditions Générales d'Utilisation (CGU) encadrent l'accès et l'utilisation de la plateforme TaskFlow. En créant un compte, l'utilisateur accepte sans réserve ces conditions.
                        </p>

                        <h2>2. Accès au service</h2>
                        <p>
                            TaskFlow est un outil de gestion de tâches collaboratif. L'accès nécessite une inscription valide. L'utilisateur est responsable de la confidentialité de ses identifiants.
                        </p>

                        <h2>3. Propriété Intellectuelle</h2>
                        <p>
                            Tous les éléments du site (logos, textes, code source) sont la propriété exclusive de TaskFlow. Toute reproduction même partielle est interdite.
                        </p>

                        <h2>4. Données Personnelles (RGPD)</h2>
                        <p>
                            Conformément au RGPD, TaskFlow s'engage à protéger vos données. Les informations collectées lors de l'inscription sont utilisées uniquement pour le bon fonctionnement de votre compte. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
                        </p>

                        <h2>5. Responsabilité</h2>
                        <p>
                            TaskFlow met tout en œuvre pour assurer une disponibilité du service 24h/24. Toutefois, nous ne pourrons être tenus responsables des interruptions pour maintenance ou des pertes de données liées à une mauvaise utilisation.
                        </p>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
};

export default CGU;