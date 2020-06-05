# Risks

Niveaux de probabilité & d'importance possibles :
- Bas : :no_mouth:
- Medium : :grimacing:
- Critique : :fire:

## Écriture d'un risque: Le template:

- **Parce que** (optionnel si la raison est évidente): La raison 
- **Si** : La condition d'apparition du risque
- **Alors**: La conséquence

## Sprint 1

### Risk #1

**Si** nous ne parvenons pas à héberger une partie 
**Alors** nous ne pourront pas dévelloper d'autres fonctionnalitées

Probabilité : :no_mouth:
Importance : :fire:

Actions :
- faire en sorte que ça marche
- faire des recherches (spike) pour trouver différent moyen d'héberger une partie afin de toujours avoir une seconde possibilité en cas d'échec

### Risk #2

**Si** nous ne parvenons pas à permettre au MJ de partager des documents 
**Alors** l'aspect interractif ajouté par notre application en sera impacté, il en va de même pour l'aspect aide administrative du MJ

Probabilité : :no_mouth:
Importance : :fire:

Actions :
- faire des recherches (spike) de manière a définir les meilleures manières de partager des document d'un téléphone a l'autre en local (bluetooth / wifi / ...)
- demander des conseils à notre sponsor à propos des différentes manière de transfert 

## Sprint 2

### Risk #1

**Si** nous rencontrons des problèmes lors de l'implémentation des conversations privées
**Alors** on perd un des principe fondamental de notre application ( plus d'alliance, plus de message privé avec le MJ, ... ) on perd l'innovation

Probabilité : :grimacing: => :no_mouth:
Importance : :fire:

Actions :
- Chercher différents moyen d'éachanger des messages entre les téléphones

### Risk #2

**Si** l'édition de fichier est encombrante et peu intuitive
**Alors** le joueur se sentirait perdu et l'application n'aurait pas d'intêret

Probabilité : :grimacing:
Importance : :grimacing:

Actions :
- demander des conseil a notre sponsor IHM pour avoir une application utilisable et comprehensible par tout utilisateur
- faire des tests utilisateurs pour avoir des retours utilisateurs de manière a adapté notre application au mieux 

### Risk #3

**Si** on n'arrive pas à développer le système de succès
**Alors** on perdrait une fonctionnalité innovante, non disponible sur les autres applications du marché

Probabilité : :no_mouth:
Importance : :grimacing:

Actions :
- En cas d'échec, chercher d'autres fonctionnalités innovantes

### Risk #4

**Si** on arrive pas à développer le sytème de Crowdsourcing
**Alors** on perd une des briques dorées de notre projet

Probabilité : :grimacing:
Importance : :fire:

Actions :
- Reussir

## Sprint 3

### Risk #1

**Si** on améliore pas le design de l'application
**Alors** l'application perd de son cahrme et de son attraction envers les utilisateurs malgré toutes les fonctionnalitées proposées

Probabilité : :fire:
Importance : :fire:

Actions :
- se renseigner sur des design qui pourrait être cohérent avec notre application et plaire au plus grand nombre (peut etre google form)

### Risk #2

**Si** on ne réussi pas a établir l'identification des utilisateurs par téléphone (id)
**Alors** n'importe quel utilisateur pourra se faire passer pour quelqu'un d'autre et prendre sa place 

Probabilité : :fire:
Importance : :fire:

Actions :
- se renseigner sur une implementation permettant de reconnaitre les telephone en leur attribuant un identifiant qu'ils conserveront indéfiniment (déjà trouvé)

### Risk #3

**Si** on ne parvient pas à rendre nos fiches de personnages modulable et a utiliser des dés spéciaux
**Alors** l'application d'assistant au JDR ne pourra s'adapter a tous les jeux de rôles et se verra contraintes a ceux utilisant les fiches de personnages et les dés basiques

Probabilité : :grimacing:
Importance : :grimacing:

Actions :
- implémenter un maximum de type de fiche et de dés spéciaux, pour convenir au plus grand nombre de JDR et donc d'utilisateurs
