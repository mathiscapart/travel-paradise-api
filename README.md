# travel-paradise-api

api pour la **gestion des utilisateurs**, **des visites**, **des organisations**, **et des réservation**, développée avec **Node-JS**, **Sequelize** et **Express**.

## 🚀 Fonctionnalités

- 🔐 Gestion des utilisateurs (CRUD)
- 🏢 Gestion des organisations (CRUD)
- 📅 Gestion des visites (CRUD)
- 🧾 Gestion des réservations (CRUD)
- 🗄️ Gestion de la base de données (Sequelize, MariaDB)
- 🌐 Gestion des routes API (Express)
- 🔑 Génération de tokens utilisateurs (JWT)

---

## 🧱 Stack technique

- **@sequelize/mariadb: ^7.0.0-alpha.46**
- **bcrypt: 6.0.0**
- **body-parser: 2.2.0**
- **dotenv: 16.5.0**
- **express: 5.1.0**
- **express-validator: 7.2.1**
- **jsonwebtoken: 9.0.2**
- **sequelize: 6.37.7**

---

## 📁 Arborescence principale

````
src/
├── models/ # dossier pour les models de bdd
│ ├── index.js # instance sequelize
│ ├── listeEquipement.model.js # model de la table de la liste des équipements 
│ ├── organisation.model.js # model de la table de les organisations
│ ├── relations.model.js # relation entre les tables 
│ ├── reservation.model.js # model de la table de les réservations
│ ├── user.model.js # model de la table de les users
│ └── visite.model.js # model de la table de les visites

├── routes/ # dossier pour les routes api
│ ├── index.js # Appel des roue api et du token et de la route /login
│ ├── organisation.routes.js # Routes CRUD api pour la gestion des organisations
│ ├── reservation.routes.js # Routes CRUD api pour la gestion des reservations
│ ├── user.routes.js # Routes CRUD api pour la gestion des utilisateurs
│ └── visite.routes.js # Routes CRUD api pour la gestion des visites

├── createDefautlAdmin.js # Création d'un user admin par défautl
└── Index.js # Connection de l'api a la base de donnée

````
## ⚙️ Installation & lancement

### Prérequis
- Node.js ≥ 18
- Expo CLI (npm install -g expo-cli)
````
npm install -g expo-cli
````

```
cd travelparadise
npm install
npm run start
```
