# Publication gratuite sur Netlify

**Pour l’administration, utiliser le déploiement automatique depuis GitHub** : dépôt `josuetk73-cell/Silo-trading-quipment`, branche `main`, commande `npm run build`, dossier `dist`. Lire `ADMINISTRATION.md` pour activer la connexion OAuth. Un ZIP déployé manuellement ne suffit pas pour publier automatiquement les changements du CMS.

Le site est statique : aucun serveur payant ni base de données n’est nécessaire. Le forfait gratuit de Netlify est soumis à ses limites d’utilisation et conditions en vigueur ; vérifier celles-ci lors de l’inscription.

## Avant la publication finale

Les coordonnées sont intégrées : WhatsApp et appels +243 85 811 02 05 ; e-mail siloeebbuilding@gmail.com. Les formulaires ouvrent WhatsApp ou votre logiciel e-mail avec un message préparé : l’expéditeur doit confirmer l’envoi. Il ne s’agit pas d’un envoi automatique depuis un serveur.

Le logo et les photos partagés dans la conversation restent à intégrer depuis leurs fichiers originaux. Ils ne sont pas encore dans cette version. La galerie ne présente aucune réalisation inventée. Finaliser également la notice de confidentialité selon les pratiques réelles de l’entreprise.

## Créer votre compte

1. Ouvrir https://app.netlify.com/signup et choisir une méthode d’inscription proposée (e-mail ou compte GitHub, selon l’interface).
2. Vérifier votre adresse si demandé, puis choisir l’offre gratuite. Ne souscrire aucune option payante pour ce site sans en avoir besoin.
3. Garder votre mot de passe et vos codes de connexion privés. Aucune clé API n’est nécessaire pour un dépôt manuel.

## Premier déploiement manuel

1. Télécharger `siloe-site-publication.zip`, puis extraire l’archive. Elle contient le dossier `dist` et les en-têtes de sécurité `_headers`.
2. Une fois connecté à Netlify, utiliser https://app.netlify.com/drop ou l’option de déploiement manuel proposée dans votre tableau de bord.
3. Déposer le dossier `dist` contenant `index.html` à sa racine.
4. Attendre la fin du déploiement, puis ouvrir l’URL HTTPS attribuée par Netlify. Le nom exact est attribué par la plateforme et n’est pas connu à l’avance.
5. Me transmettre uniquement cette URL publique. Je pourrai alors la renseigner dans la configuration du site, générer les URL canoniques et le sitemap, activer l’indexation et vérifier l’adresse si elle est accessible depuis cet environnement. Redéposer ensuite le dossier `dist` mis à jour dans le même site Netlify.

L’adresse fournie par le propriétaire est désormais renseignée dans la configuration : les liens canoniques, le sitemap et l’indexation sont activés pour cette adresse. Cela ne rend pas le site privé ; son URL reste accessible aux personnes qui la connaissent.

## Vérifications après déploiement

Ouvrir les six pages sur téléphone et ordinateur. Tester l’appel, le lien e-mail et le bouton WhatsApp. Remplir une demande, vérifier les informations préparées, puis envoyer un message de test à l’entreprise. Vérifier sa réception réelle. Aucun test automatisé local ne prouve une livraison WhatsApp ou e-mail.

## Domaine personnalisé ultérieur

L’adresse Netlify suffit pour partager le site. Plus tard, acheter votre domaine auprès du fournisseur de votre choix, l’ajouter dans les paramètres de domaine Netlify et recopier uniquement les enregistrements DNS indiqués par la plateforme. Préserver les éventuels enregistrements de messagerie. Attendre l’activation HTTPS, puis mettre à jour `url` dans `src/company.json`, reconstruire et redéployer. Le domaine personnalisé peut être payant même si l’hébergement reste gratuit.

## Modifications

Après activation OAuth, modifier les contenus dans `/admin/`, sans code : les textes/services sont conservés dans `src/content.json`, les coordonnées et chemins d’images dans `src/company.json`. La présentation technique reste dans `public/style.css`. Exécuter `npm run build` et `npm test`, puis déposer le nouveau `dist` dans le même projet Netlify. Le README décrit aussi le déploiement automatique depuis un dépôt GitHub.
