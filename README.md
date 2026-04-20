# TaskFlow - Gestionnaire de tâches collaboratif

TaskFlow est une application web Fullstack permettant de gérer des projets et des tâches en équipe. Ce projet met l'accent sur une interface utilisateur soignée et une gestion sécurisée de l'authentification.

---
##  Architecture technique

### Frontend & Outils
* **Front-end :** React 19+ avec Vite
* **API REST :** Node.js + Express
* **Base de données :** MySQL 8.0+ (Hébergée sur Supabase)
* **Authentification :** JWT + bcrypt + cookie httpOnly
* **Drag & Drop :** @dnd-kit/core
* **Export PDF :** jsPDF + html2canvas
* **Hébergement :** Vercel (front) - Plesk (back)

---

##  Fonctionnalités Principales

### Expérience Utilisateur
* **Tableau Kanban Dynamique :** Visualisation des flux de travail (À faire, En cours, Revue, Terminé).
* **Gestion Collaborative :** Création de projets et invitation de membres via email.
* **Suivi de Productivité :** Système de minuteur intégré par tâche pour comparer le temps prévu et le temps réel.
* **Filtres Avancés :** Affichage personnalisé des tâches par membre ou par niveau de priorité.

### Optimisation Technique
* **Gestion des Rôles :** Distinction entre le chef de projet (créateur du projet) et les membres.
* **Responsive Design :** Interface entièrement adaptée aux supports mobiles, tablettes et desktop.
* **Sécurité :** Protection des routes privées et sécurisation des échanges via tokens.

---

## Installation et Démarrage

### Prérequis
* Node.js >= 18
* Une instance MySQL/PostgreSQL (Supabase) fonctionnelle
* Un environnement de variables configuré

### Quickstart
```bash
# 1. Cloner le dépôt
git clone [https://github.com/TaskFlowGirls](https://github.com/TaskFlowGirls)
cd taskflow

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Éditer .env et renseigner vos variables

# 4. Lancer le serveur de développement
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

### Variables d'environnement

| Variable       | Description | Exemple |
| -------------- | ----------- | ------- |
| `VITE_API_URL` | URL de      | http:// |
|                | l'API back- | localho |
|                | end         | st:3000 |
| `JWT_SECRET`     |      Clé secrète pour le token       |  votre_secret_ici       |
| `DATABASE_URL`     |      Chaîne de connexion BDD       |  postgresql://...       |

## Structure du Projet (Front)

```
src/
├── assets/         # Ressources statiques (Images, Logos)
├── components/     # Composants réutilisables (Navbar, Footer, Modal)
├── context/        # Logique métier & État global (AuthContext)
├── pages/          # Vues principales (Accueil, Login, Inscription)
├── styles/         # Feuilles de styles modulaires
├── App.jsx         # Configuration du routage et des providers
└── main.jsx        # Point d'entrée de l'application
```

## Documentation des Routes

```
/accueil : Présentation et mise en avant des fonctionnalités.
/login - Connexion : Authentification utilisateur.
/register - Inscription : Création de compt.
/projet - Page en version kaban pour suivre les tâches en cours.
/dashboard - Espace récapitulatif des tâches et projets en cours.
```

## Scripts Disponibles

| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Lancer le serveur de developpement |
| `npm run build`   | Construire le projet pour la prod  |
| `npm run preview` | Previsualiser le build de prod     |
| `npm run lint`    | Lancer ESLint sur le projet        |

## Auteurs

- **Agathe Courtois**
- **Éloise Robert**
- **Pauline Bennouin**
- 
## Liens et Documentation

* [Documentation React](https://react.dev/)
* [Documentation Vite](https://vite.dev/)
* [Arborescence Figma](https://www.figma.com/board/Bv28VXUGZ2zoxJTZkCMCVT/TaskFlow?node-id=0-1&t=OjGSYUjDUiQTGqol-1)
* [Maquette Figma](https://www.figma.com/design/caCA8dadMR3TaDrZTQasnq/TaskFlow?node-id=32-2&p=f&t=sRRml9zPSzPUoBT2-0)