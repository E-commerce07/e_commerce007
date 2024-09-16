# Documentation des Modèles de Base de Données et des Associations

## Modèles Utilisés

### 1. **User (Utilisateur)**

- **Description** : Le modèle `User` représente les utilisateurs de l'application. Un utilisateur peut être un client ou un vendeur.
- **Relations** :
  - **Avec Product (Produit)** : Un utilisateur peut avoir plusieurs produits, notamment lorsqu'il est vendeur. Cela est défini par une relation `hasMany` avec le modèle `Product` via la clé étrangère `seller_id`.
  - **Avec Order (Commande)** : Un utilisateur peut effectuer plusieurs commandes en tant que client. Cela est représenté par une relation `hasMany` avec le modèle `Order` via la clé étrangère `client_id`.

### 2. **Category (Catégorie)**

- **Description** : Le modèle `Category` représente les différentes catégories dans lesquelles les produits peuvent être classés.
- **Relations** :
  - **Avec Product (Produit)** : Une catégorie peut contenir plusieurs produits. Cette relation est définie par `hasMany` avec le modèle `Product` via la clé étrangère `category_id`.

### 3. **Product (Produit)**

- **Description** : Le modèle `Product` représente les produits disponibles sur la plateforme.
- **Relations** :
  - **Avec User (Utilisateur)** : Chaque produit appartient à un vendeur, ce qui est représenté par une relation `belongsTo` avec le modèle `User` via la clé étrangère `seller_id`.
  - **Avec Category (Catégorie)** : Chaque produit appartient à une catégorie, définie par une relation `belongsTo` avec le modèle `Category` via la clé étrangère `category_id`.
  - **Avec OrderItem (Article de Commande)** : Un produit peut être inclus dans plusieurs articles de commande (`OrderItem`). Cela est représenté par une relation `hasMany` avec le modèle `OrderItem` via la clé étrangère `product_id`.

### 4. **Order (Commande)**

- **Description** : Le modèle `Order` représente une commande passée par un client.
- **Relations** :
  - **Avec User (Utilisateur)** : Chaque commande est associée à un client (utilisateur) via une relation `belongsTo` avec le modèle `User` via la clé étrangère `client_id`.
  - **Avec OrderItem (Article de Commande)** : Une commande peut contenir plusieurs articles de commande, définie par une relation `hasMany` avec le modèle `OrderItem` via la clé étrangère `order_id`.

### 5. **OrderItem (Article de Commande)**

- **Description** : Le modèle `OrderItem` représente un article spécifique dans une commande, associant un produit à une commande.
- **Relations** :
  - **Avec Order (Commande)** : Chaque article de commande appartient à une commande, définie par une relation `belongsTo` avec le modèle `Order` via la clé étrangère `order_id`.
  - **Avec Product (Produit)** : Chaque article de commande est associé à un produit, représenté par une relation `belongsTo` avec le modèle `Product` via la clé étrangère `product_id`.

## Associations et Relations

Les associations sont définies pour établir des relations entre les différents modèles de la base de données, facilitant ainsi la navigation et les requêtes complexes. Voici un résumé des associations clés :

- **User <-> Product** : Un utilisateur (vendeur) peut avoir plusieurs produits. Inversement, chaque produit appartient à un utilisateur.
- **Category <-> Product** : Une catégorie peut inclure plusieurs produits. Chaque produit appartient à une catégorie.
- **User <-> Order** : Un utilisateur (client) peut passer plusieurs commandes. Chaque commande est associée à un utilisateur.
- **Order <-> OrderItem** : Une commande peut contenir plusieurs articles. Chaque article de commande est lié à une commande spécifique.
- **Product <-> OrderItem** : Un produit peut apparaître dans plusieurs articles de commande. Chaque article de commande est associé à un produit particulier.

Ces relations permettent de modéliser efficacement les interactions entre les différentes entités de l'application, facilitant ainsi la gestion des utilisateurs, produits, catégories, commandes, et articles de commande dans la base de données.
