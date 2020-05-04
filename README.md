# pns-innov1920-pns-innov1920-g

## Description de l'Application

Remus est une application crossplatform qui à pour but de simplifier la vie des joueurs de jeux de rôle en centralisant un grand nombre de fonctionnalités utile lors des parties mais aussi en amont de ces dernières en simplifiant l’organisation. Cette application, contrairement aux applications déjà existante, permettrait un partage de certaines informations (fiches des personnage joueurs, fiches simplifié des personnages non joueurs, des descriptions des lieux visités et autres) entre les différents joueurs d’une campagne de jeux de rôle. Mais aussi d'avoir accès à une messagerie permettant d’envoyé des messages discrètement aux joueurs ou au maître du jeu sans interrompre sa narration.

## Installation

To run this example in production or development mode you have to make sure, `ionic` and `cordova` are installed globally on your machine. After that you can install all necessary dependencies for running this example.

0. Check if `npm` is installed. Otherwise please [install `node.js` and `npm`](https://nodejs.org/en/download/package-manager/). Then just navigate to the *remus-app* folder
```bash
npm -v
cd remus-app
```

1. Install ionic and cordova command line interface globally.
```bash
npm install -g cordova ionic
```

2. Install all dependencies listed in [`package.json`](/package.json).
```bash
npm install
```

### Running the example in your browser
```bash
ionic serve
```

### Running the example on your device

3. Add an iOS or Android to the project.
```bash
ionic cordova platform add ios 
# or 
ionic cordova platform add android
```

4. Run the app on your device.
```bash
ionic cordova run ios
# or
ionic cordova run android
```

