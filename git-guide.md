# Guide Git pour Collaboration sur Branches

Voici un récapitulatif des commandes Git pour votre workflow collaboratif avec les branches main (production) et test (développement).

## Démarrage et Configuration

```bash
# Cloner le dépôt
git clone url_du_repo
cd nom_du_repo

# Récupérer toutes les branches distantes
git fetch --all

# Voir les branches disponibles
git branch        # Branches locales
git branch -a     # Toutes les branches (locales et distantes)

# Créer et basculer sur la branche test qui suit la branche distante
git checkout -b test origin/test
```

## Cycle de Travail Quotidien

```bash
# 1. Avant de commencer à travailler, mettre à jour votre branche (Le faire si on est pas déjà dans la branche test)
git checkout test
git pull origin test

# 2. Faire vos modifications sur les fichiers

# 3. Avant de commit et push, utiliser stash pour éviter les conflits
git stash save "Modifications en cours"  # Mettre de côté vos changements
git pull origin test                     # Récupérer les dernières modifications
git stash apply                          # Réappliquer vos changements
# (résoudre les conflits éventuels)

# 4. Enregistrer vos modifications
git add .                          # Ajouter tous les fichiers modifiés
git commit -m "Description des modifications"

# 5. Envoyer vos modifications vers le dépôt distant
git push origin test
git stash drop stash@{0} # Supprime le dernier Stash
```

## Commandes Stash Additionnelles

```bash
# Voir la liste de tous vos stash
git stash list

# Voir le contenu détaillé d'un stash
git stash show -p stash@{0}

# Appliquer un stash spécifique sans le supprimer
git stash apply stash@{n}    # n est le numéro du stash

# Créer une nouvelle branche à partir d'un stash
git stash branch nouvelle-branche stash@{0}

# Supprimer un stash spécifique
git stash drop stash@{0}

# Supprimer tous les stash
git stash clear
```

## Fusion entre Branches

```bash
# Pour intégrer les changements de main dans test
git checkout test
git merge main
git push origin test

# Pour déployer test vers main (mise en production)
git checkout main
git pull                # S'assurer d'avoir la dernière version
git merge test
git push origin main
```

## Récupération en Cas d'Erreur

```bash
# Annuler un merge problématique (recommandé)
git log --oneline
git revert -m 1 <hash-du-commit-de-merge>
git push origin main

# OU retour à une version antérieure (avec précaution)
git checkout main
git reset --hard <hash-du-dernier-bon-commit>
git push --force origin main
```

## Utilisation des Tags pour Versions Stables

```bash
# Marquer une version stable
git checkout main
git tag v1.0.0
git push --tags

# Revenir à une version taguée
git checkout v1.0.0
```