Environnement backend du P6 Openclassroom 'Piiquante'. 

Ici l'API du projet, ses modèles (user / sauce), ses controlleurs et ses routes sont configurés. 

Express est utilisé dans cette configuration
MongoDB est utilisé dans cette configuration


UTILISATION DE L'APPLICATION : 

L'application permet à un utilisateur de consulter une liste de sauces piquantes, et afficher les détails d'une seule sauce. L'utilisateur enregistré à la possibilité de poster une fiche de sauce, en indiquant différents éléments tels que le nom, le fabriquant, la description, l'ingrédient principal utilisé, une image du produit ...
Utilisateur peut supprimer ou modifier une sauce qu'il a lui-même posté, mais il ne peut pas supprimer ou modifier celles des autres utilisateurs. 

Un système de like/dislike permet de noter les sauces par les utilisateurs. La somme des likes/dislikes est visible pour chaque élément. Par défaut, lors de la création d'une nouvelle fiche, ce compteur est mis à 0. 

SECURITE: 

Le pluggin Mongoose-unique-validateur s'asssure qu'un seul ID à partir d'une même adresse peut-être créé
Le package password-validator nous permet de créer un middleware pour définir les règles de création d'un mot de passe.


Le package bcrypt nous permet de créer un hash du mot de passe, et attribuer un TOKEN de connexion à l'utilisateur. 