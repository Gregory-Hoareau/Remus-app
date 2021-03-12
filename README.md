# Remus : Assistant pour JdR

## Description de l'application

Remus est une application crossplatform qui à pour but de simplifier la vie des joueurs de jeux de rôle en centralisant un grand nombre de fonctionnalités utile lors des parties mais aussi en amont de ces dernières en simplifiant l’organisation. Cette application, contrairement aux applications déjà existante, permettrait un partage de certaines informations (fiches des personnage joueurs, fiches simplifié des personnages non joueurs, des descriptions des lieux visités et autres) entre les différents joueurs d’une campagne de jeux de rôle. Mais aussi d'avoir accès à une messagerie permettant d’envoyé des messages discrètement aux joueurs ou au maître du jeu sans interrompre sa narration.

Icons fournis par : https://game-icons.net



## Installation du frontend

Pour faire tourner cette application en mode development soyez sur que `ionic` et `cordova` sont installé globalement sur votre machine. Vous pouvez ensuite installer toute les dépendances nécessaires pour tourner cet example.

0. Verifier que `npm` est installé. Sinon, veuillez [installer `node.js` et `npm`](https://nodejs.org/en/download/package-manager/). Ensuite naviguez dans un terminal vers le dossier *remus-app* et lancer la ligne de commande :
```bash
npm -v
cd remus-app
```

1. Installez globalement ionic et cordova avec la ligne de commande :
```bash
npm install -g cordova ionic
```

2. Installez toutes les dépendances indiquées dans le fichier [`package.json`](/remus-app/package.json) :
```bash
npm install
```

### Faire tourner l'exemple dans votre navigateur
```bash
ionic serve
```

### Faire tourner l'exemple sur votre appareil

3. Ajoutez une platforme IOS ou Android au projet :
```bash
ionic cordova platform add ios 
# or 
ionic cordova platform add android
```

4. Lancez l'application sur votre appareil :
```bash
ionic cordova run ios
# or
ionic cordova run android
```

## Installation du backend

1. Rendez vous dans le dossier *remus-backend*
```bash
cd remus-backend
```

2. Installez toutes les dépendances indiquées dans le fichier [`package.json`](/remus-backend/package.json)
```bash
npm install
```

### Lancer le serveur
```bash
npm start
```
