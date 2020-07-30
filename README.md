# Remus : Assistant pour JdR

## Description de l'application

Remus est une application crossplatform qui à pour but de simplifier la vie des joueurs de jeux de rôle en centralisant un grand nombre de fonctionnalités utile lors des parties mais aussi en amont de ces dernières en simplifiant l’organisation. Cette application, contrairement aux applications déjà existante, permettrait un partage de certaines informations (fiches des personnage joueurs, fiches simplifié des personnages non joueurs, des descriptions des lieux visités et autres) entre les différents joueurs d’une campagne de jeux de rôle. Mais aussi d'avoir accès à une messagerie permettant d’envoyé des messages discrètement aux joueurs ou au maître du jeu sans interrompre sa narration.

Icons fournis par : https://game-icons.net



## Installation du frontend

Pour faire tourner cette application en mode development soyez sur que `ionic` et `cordova` sont installé globalement sur votre machine. Vous pouvez ensuite installer toute les dépendances nécessaires pour tourner cet example.

0. Verifier que `npm` est installé. Sinon, veuillez [installer `node.js` et `npm`](https://nodejs.org/en/download/package-manager/). Ensuite naviguez dans un terminal ver le dossier *remus-app* et lancer la ligne de commande :
```bash
npm -v
cd remus-app
```

1. Installez globalement ionic et cordova avec la ligne de commande :
```bash
npm install -g cordova ionic
```

2. Installez toutes les dépendances indiquées dans le fichier [`package.json`](/package.json) :
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

Pour lancer le backend il vous faudra python 3.X.X d'installé sur votre machine. Pour verifier la version de python installé utilisez la ligne de commande ci-contre :

```bash
python -V
# or
python3 -V
```

Si python 3.X.X est installé sous le nom `python3` il vous faudra remplacer `python` par `python3` dans les lignes de commandes qui suivent.
Si `python3 -m pip ...` ne marche pas pour vous, lancez `sudo apt-get install python3-pip`

1. Créez le dossier d'environement virtuel :

```bash
python -m pip install virtualenv

cd remus-backend
virtualenv venv
```

Pour activer l'environement vitruel lancer la ligne de commande suivante.

```bash
source venv/bin/activate # if you are on Linux or Mac

#To desactivate the virtual environment
deactivate
```

Une fois l'environement virtuel activé, vous verrez `(venv)` en préfixe de vos lignes d'écritures sur le terminal.

2. Istallez les modules du backend pour votre environement virtuel :

Pour les etapes suivantes, il vous faudra activer l'environement virtuel

### Installer Django

```bash
python -m pip install Django
```

### Installer Django Rest Framework

```bash
pip install djangorestframework
```

### Installer Django cors headers

```bash
python -m pip install django-cors-headers
```


3. Lancez le backend :

```bash
cd crowdsourcing
python manage.py runserver
```

Ceci lancera le serveur sur localhost:8000, si vous voulez utiliser une autre adresse ou port utilisez la commande suivante.

```bash
python manage.py runserver ip:port
```

où `ip` et `port` sont l'addresse IP et le port que vous souhaitez.
Si vous utilisez cette methode, il vous faudra ajouter `ip` dans la variable `ALLOWED_HOST` qui se trouve dans `remus-backend/crowdsorucing/crowdsourcing/settings.py`
