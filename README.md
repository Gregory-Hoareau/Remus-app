# pns-innov1920-pns-innov1920-g

## Description de l'application

Remus est une application crossplatform qui à pour but de simplifier la vie des joueurs de jeux de rôle en centralisant un grand nombre de fonctionnalités utile lors des parties mais aussi en amont de ces dernières en simplifiant l’organisation. Cette application, contrairement aux applications déjà existante, permettrait un partage de certaines informations (fiches des personnage joueurs, fiches simplifié des personnages non joueurs, des descriptions des lieux visités et autres) entre les différents joueurs d’une campagne de jeux de rôle. Mais aussi d'avoir accès à une messagerie permettant d’envoyé des messages discrètement aux joueurs ou au maître du jeu sans interrompre sa narration.

Icons fournis par : https://game-icons.net

## Installation for the frontend

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

## Installation for the backend

To run the backend you will need to have python 3.X.X install. To check the version of your python use the following command lines

```bash
python -V
# or
python3 -V
```

If python 3.X.X is install under the name `python3` for the first part you will need to replace `python` by `python3` in the command lines of the part 1
If `python3 -m pip ...` doesn't work for you, run `sudo apt-get install python3-pip`

1. Create virtual enviroment folder

```bash
python -m pip install virtualenv

cd remus-backend
virtualenv venv
```

To activate the virtual environment use the following command line.

```bash
source venv/bin/activate # if you are on Linux or Mac

#To desactivate the virtual environment
deactivate
```

Once the virtual environment is activate, you will see `(venv)` in front of the lines in your terminal.

2. Install the used module of the backend in your virtual environment

For the following steps, you will need to activate the virtual environment

### Install Django

```bash
python -m pip install Django
```

### Install Django Rest Framework

```bash
pip install djangorestframework
```

### Install Django cors headers

```bash
python -m pip install django-cors-headers
```


3. Run the backend

```bash
cd crowdsourcing
python manage.py runserver
```

This will run the server on localhost:8000, if you want to launch it elsewhere use the following

```bash
python manage.py runserver ip:port
```

where `ip` and `port` are the IP address and the port you want.
