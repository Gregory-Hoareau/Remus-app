const fs = require('fs');

/**
 * @author Gregory
 * 
 * La classe RestOperator permet de ne pas devoir réécrire les fonctions de base d'un serveur REST à chaque fois que l'on souhaite les 
 * utiliser dans une route du serveur.
 */
class RestOperator {

    /**
     * Constructeur de la classe
     * @param {string} name Nom de la ressource gérée par la classe
     * @param {string} fn Chemin de fichier utilisé par la classe pour sauvegarder les ressources
     */
    constructor(name, fn) {
        this.name = name
        this.filename = fn
        this.items = []

        this.load()
    }

    /**
     * C'est la fonction répondant aux requêtes GET.
     * Elle renvoie toutes les ressources sauvegarder par la classe.
     * @returns {Object[]} La liste des ressources liées à la classe
     */
    get = () => {
        return this.items;
    }

    /**
     * Cette fonction permet de trouver et renvoyer un élément par rapport à son id (qui est unique)
     * Si l'élement n'est pas trouver alors un erreur est levée.
     * @param {number} id L'identifiant unique associé à la ressource recherchée
     * @returns {Object} La ressource possédant l'identifiant "id"
     */
    getById = (id) => {
        const item = this.items.find(i => i.id == id);
        if(!item) throw new ItemNotFoundError(`Cannot get ${this.name} object with id=${id}. This object doesn't exist.`);
        return item;
    }

    /**
     * C'est la fonction répondant aux requêtes POST.
     * @param {Object} boby La representation JSON de la ressource à créer
     * @returns {Object} La ressource nouvellement créer
     */
    post = (boby) => {
        const item = Object.assign({}, boby, {id: Date.now()})
        this.items.push(item);
        save(this.items, this.filename);
        return item;
    }

    /**
     * C'est la fonction répondant aux requêtes PUT.
     * @param {number} id L'identifiant unique de la ressource à mettre à jour
     * @param {Object} body La representation JSON de la ressource mise à jour
     * @returns {Object} La ressources mise à jour
     */
    update = (id, body) => {
        const oldIndex = this.items.findIndex(i => i.id == id);
        if(oldIndex == -1) throw new ItemNotFoundError(`Cannot update ${this.name} object with id=${id}. This object doesn't exist.`);
        const updatedItem = Object.assign({}, this.items[oldIndex], body);
        this.items[oldIndex] = updatedItem;
        save(this.items, this.filename);
        return updatedItem;
    }

    /**
     * C'est la fonction répondant aux requêtes DELETE.
     * @param {number} id L'identifiant unique de la ressource à supprimer
     */
    delete = (id) => {
        const index = this.items.findIndex(i => i.id == id);
        if(index == -1) throw new ItemNotFoundError(`Cannot delete ${this.name} object with id=${id}. This object doesn't exist.`);
        this.items.splice(index, 1);
        save(this.items, this.filename);
    }

    /**
     * Cette fonction permet de charger les ressources sauvegarder au préalable sur le serveur.
     * Elle est appellé lors de la construction d'un RestOperator
     */
    load = () => {
        this.items = require(`../${this.filename}`);
    }
}

/**
 * @author Gregory
 * 
 * C'est une fonction utilitaire de la classe RestOperator utilisé pour sauvegarder les ressources de la classe dans un fichier
 * @param {Object[]} list La liste des ressources à sauvegarder 
 * @param {string} path Le chemin du fichier dans lequel sauvegarder les ressources
 */
function save(list, path) {
    try {
        fs.writeFileSync(path, JSON.stringify(list));
    } catch(e) {
        console.error(e);
    }
}

/**
 * @author Gregory
 * 
 * Classe d'erreur qui est levé par la classe RestOperator quand une ressource demandé n'est pas trouvée
 */
class ItemNotFoundError extends Error {

    /**
     * Constructeur de classe
     * @param {string} mess Message d'erreur qui sera affiché
     */
    constructor(mess) {
        super();
        this.name = "ItemNotFoundError";
        this.message = mess;
    }
}

module.exports = RestOperator;