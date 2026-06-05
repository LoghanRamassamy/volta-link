# ⚡ Volta Link — URL Shortener

Volta Link est un service de réduction d'URL moderne, sécurisé et performant. Ce projet a été développé en respectant rigoureusement les principes de la **Clean Architecture**, du **Domain-Driven Design (DDD)**, de l'**immuabilité** et de la rigueur TypeScript.

---

## 🏗️ Choix Techniques & Architecture

Le projet est structuré sous forme de Monorepo contenant deux applications indépendantes (`frontend/` et `backend/`) qui partagent la même rigueur d'organisation en couches :

```text
┌─────────────────────────────────────────────────────────┐
│                     Infrastructure                      │
│      (Backend: Prisma/SQLite | Frontend: Fetch, Storage)│
│     ┌─────────────────────────────────────────────┐     │
│     │                Presentation                 │     │
│     │      (Backend: Express | Frontend: React)   │     │
│     │     ┌─────────────────────────────────┐     │     │
│     │     │           Application           │     │     │
│     │     │     (Use Cases, Interfaces)     │     │     │
│     │     │     ┌─────────────────────┐     │     │     │
│     │     │     │       Domain        │     │     │     │
│     │     │     │   (Entities, VOs)   │     │     │     │
│     │     │     └─────────────────────┘     │     │     │
│     │     └─────────────────────────────────┘     │     │
│     └─────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### 1. Domain Layer (Couche Métier Pure)
Exempte de toute dépendance vers des frameworks ou librairies externes :
- **Value Objects (Objets de Valeur)** : Garantissent la validité des données dès leur instanciation (`OriginalUrl` pour le format URL, `UrlCode` pour la longueur/caractères autorisés du code, `ExpirationDate` pour s'assurer que la date est valide et dans le futur).
- **Entities (Entités)** : Représentent le coeur de nos données, par exemple `ShortLink`, contenant l'état métier et des méthodes autonomes d'évaluation (`isExpired`).
- **Immuabilité** : Toutes les propriétés sont déclarées en `readonly` et les instances sont figées avec `Object.freeze()` à la création.

### 2. Application Layer (Cas d'Utilisation)
Orchestre les flux de données et exécute la logique fonctionnelle de l'application :
- **Use Cases** : `ShortenUrlUseCase` (réduction d'un lien avec validation et enregistrement) et `GetOriginalUrlUseCase` (validation et récupération du lien original pour redirection).

### 3. Presentation Layer (Interface Utilisateur & Contrôleurs)
Fait office de pont entre le protocole de communication (HTTP/React) et la couche Application :
- **Backend (Express)** : Contrôleurs (`ShortenUrlController`, `RedirectUrlController`) gérant la validation des requêtes, le mapping des DTOs, et le renvoi de pages HTML d'erreur stylisées en cas de lien expiré ou non trouvé.
- **Frontend (React)** : Composants visuels modularisés, custom hook (`useShortener`) jouant le rôle de contrôleur/viewModel, et feuille de style globale en **Vanilla CSS** implémentant un design Glassmorphic sombre premium.

### 4. Infrastructure Layer (Détails Techniques)
Implémente les interfaces définies par les couches supérieures :
- **Backend** : Connexion de base de données via **Prisma ORM** ciblant une base locale **SQLite** (`dev.db`).
- **Frontend** : Communication réseau (`HttpShortLinkGateway` via `fetch`) et persistence locale (`LocalStorageHistoryRepository` via `localStorage` pour conserver l'historique de l'utilisateur).

---

## ⚙️ Prérequis

- [Docker](https://www.docker.com/) et Docker Compose.
- [Make](https://www.gnu.org/software/make/) (optionnel, mais recommandé pour simplifier le lancement).

---

## 🚀 Lancement de l'Application

Toutes les actions de construction et de démarrage sont automatisées via le `Makefile` à la racine :

### 1. Démarrer le projet
Cette commande construit les images Docker du frontend et du backend, applique automatiquement les migrations de base de données SQLite via Prisma, et lance les deux applications :
```bash
make start
```
Une fois démarré, vous pouvez accéder à :
- **L'application Web (Frontend)** : [http://localhost:5173](http://localhost:5173)
- **L'API de redirection (Backend)** : [http://localhost:3001/:code](http://localhost:3001/ton-code)

### 2. Arrêter le projet
Pour stopper proprement les conteneurs :
```bash
make stop
```

### 3. Exécuter les Tests Unitaires
Pour lancer la suite de tests Jest sur le frontend et le backend au sein des conteneurs :
```bash
make test
```

---

## 🎯 Fonctionnalités Incluses

- **Validation Stricte** : Empêche la réduction de chaînes invalides ou de protocoles non pris en charge.
- **Code Personnalisé** : Choix optionnel d'un alias court pour votre lien (de 3 à 10 caractères alphanumériques).
- **Date d'Expiration** : Définition optionnelle d'une date et heure d'expiration (qui doit être dans le futur). Si un utilisateur visite un lien expiré, une page d'erreur dédiée (code HTTP 410) s'affiche.
- **Historique Local** : Sauvegarde des liens raccourcis directement dans le navigateur de l'utilisateur pour un accès rapide.
- **Design Réactif Premium** : Expérience fluide sur mobiles et ordinateurs, avec des animations interactives lors de la copie ou du chargement.
