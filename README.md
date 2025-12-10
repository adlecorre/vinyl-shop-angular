# 🎵 Gestion Vinyle

Application web de gestion et vente de vinyles développée avec Angular 19.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Architecture](#architecture)
- [Utilisation](#utilisation)
- [API Backend](#api-backend)

## 🎯 Aperçu

Gestion Vinyle est une application e-commerce permettant aux utilisateurs de parcourir un catalogue de vinyles, gérer leur panier d'achats, passer des commandes et suivre l'historique de leurs achats. L'application comprend un système d'authentification sécurisé avec JWT et une interface utilisateur moderne et responsive.

## ✨ Fonctionnalités

### Authentification
- 🔐 Inscription et connexion sécurisées
- 🎫 Gestion des tokens JWT
- 👤 Profil utilisateur modifiable

### Catalogue
- 📀 Affichage du catalogue complet de vinyles
- 🔍 Recherche par titre
- 📸 Visualisation des pochettes
- 💰 Affichage des prix et stocks disponibles

### Panier
- 🛒 Ajout/retrait d'articles
- ➕➖ Modification des quantités
- 💾 Persistance locale du panier
- 🧮 Calcul automatique du total

### Commandes
- ✅ Validation et création de commandes
- 📦 Suivi du statut (EN_ATTENTE, CONFIRMEE, ANNULEE)
- 📜 Historique des commandes
- 🔍 Détails de chaque commande

### Interface
- 📱 Design responsive avec Bootstrap 5
- 🎨 Icônes Font Awesome
- 🔄 Navigation fluide entre les pages

## 🛠 Technologies utilisées

### Frontend
- **Framework**: Angular 19 (standalone components)
- **Styling**: Bootstrap 5, CSS3
- **Icônes**: Font Awesome
- **Gestion d'état**: RxJS, Signals
- **Authentification**: JWT (jwt-decode)
- **Routing**: Angular Router
- **Forms**: Reactive Forms, Template-driven Forms

### Backend (API REST)
- Spring Boot
- Spring Security avec JWT
- JPA/Hibernate
- Base de données relationnelle

## 📦 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)
- Java 17+ (pour le backend)
- Maven (pour le backend)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone <url-du-repository>
cd gestion-vinyle
```

### 2. Installer les dépendances frontend

```bash
npm install
```

### 3. Installer le backend

```bash
cd ../backend
mvn clean install
```

## ⚙️ Configuration

### Frontend

Configurer l'URL du backend dans `src/app/environments/environment.development.ts`:

```typescript
export const environment = {
    BACKEND_URL: 'http://localhost:8080/api'
};
```

### Backend

Configurer la base de données dans `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vinyle_db
spring.datasource.username=votre_username
spring.datasource.password=votre_password
```

## 🎬 Démarrage

### 1. Démarrer le backend

```bash
cd backend
mvn spring-boot:run
```

Le serveur backend démarre sur `http://localhost:8080`

### 2. Démarrer le frontend

```bash
cd frontend
ng serve
```

L'application est accessible sur `http://localhost:4200`

## 🏗 Architecture

### Structure du projet

```
src/
├── app/
│   ├── components/          # Composants de l'application
│   │   ├── accueil/         # Page d'accueil
│   │   ├── catalogue/       # Catalogue de vinyles
│   │   ├── panier/          # Gestion du panier
│   │   ├── commandes/       # Liste des commandes
│   │   ├── commande-details/# Détails d'une commande
│   │   ├── connexion/       # Page de connexion
│   │   ├── inscription/     # Page d'inscription
│   │   ├── profil/          # Profil utilisateur
│   │   └── shared-module/   # Composants partagés (navbar, header)
│   ├── models/              # Interfaces TypeScript
│   │   ├── user.ts
│   │   ├── commande.ts
│   │   └── ligne-commande.ts
│   ├── services/            # Services Angular
│   │   ├── auth.ts          # Authentification
│   │   ├── catalogue.ts     # Gestion du catalogue
│   │   ├── panier.service.ts# Gestion du panier
│   │   ├── commande.ts      # Gestion des commandes
│   │   └── user.ts          # Gestion des utilisateurs
│   ├── guards/              # Guards de navigation
│   │   └── auth-guard.ts    # Protection des routes
│   └── environments/        # Configuration d'environnement
```

### Flux de données

```
Composants → Services → HTTP Client → API Backend
     ↓
  RxJS Observables & Signals
     ↓
  Mise à jour de l'UI
```

### Sécurité

- **Intercepteur HTTP**: Ajoute automatiquement le token JWT aux requêtes
- **Auth Guard**: Protège les routes nécessitant une authentification
- **Vérification d'expiration**: Validation côté client des tokens expirés
- **Hachage des mots de passe**: Côté backend avec BCrypt

## 📖 Utilisation

### 1. Créer un compte

- Accéder à la page d'inscription
- Remplir le formulaire (email, mot de passe, informations personnelles)
- Valider l'inscription

### 2. Se connecter

- Utiliser l'email et le mot de passe créés
- Accéder au catalogue après authentification

### 3. Parcourir le catalogue

- Visualiser tous les vinyles disponibles
- Rechercher un vinyle par titre
- Voir les détails (prix, stock, pochette)

### 4. Gérer le panier

- Ajouter des vinyles au panier depuis le catalogue
- Modifier les quantités
- Supprimer des articles
- Voir le total en temps réel

### 5. Passer commande

- Valider le panier
- Confirmer la commande
- Consulter l'historique dans "Mes commandes"

### 6. Modifier son profil

- Accéder à la page profil
- Mettre à jour les informations personnelles
- Changer le mot de passe si nécessaire

## 🔌 API Backend

### Endpoints principaux

#### Authentification
```
POST /api/auth/register    # Inscription
POST /api/auth/login       # Connexion
```

#### Vinyles
```
GET  /api/vinyles          # Liste tous les vinyles
GET  /api/vinyles/{id}     # Détails d'un vinyle
GET  /api/vinyles/titre/{titre} # Recherche par titre
PUT  /api/vinyles/{id}/stock    # Mise à jour du stock
```

#### Commandes
```
POST /api/commandes              # Créer une commande
GET  /api/commandes/user/{userId}# Commandes d'un utilisateur
```

#### Lignes de commande
```
POST /api/lignes                    # Créer une ligne
GET  /api/lignes/commande/{commandeId} # Lignes d'une commande
```

#### Utilisateurs
```
GET  /api/users/email/{email}  # Récupérer un utilisateur par email
PUT  /api/users/{id}           # Mettre à jour un utilisateur
```

## 📝 Notes de développement

### Gestion du panier

Le panier est géré via un service utilisant:
- **BehaviorSubject** pour la réactivité
- **localStorage** pour la persistance
- Synchronisation automatique avec le catalogue

### Signals Angular

Utilisation des signals pour:
- État des composants
- Messages d'erreur
- Données du catalogue
- Liste des commandes

### Intercepteur HTTP

L'intercepteur ajoute automatiquement le token JWT à toutes les requêtes (sauf connexion) et vérifie son expiration.

