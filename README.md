# SILOE TRADING EQUIPMENT

Site en français, généré en HTML/CSS/JavaScript avec Node.js 22 ou supérieur (validé avec Node 24). Architecture statique sans dépendance de production : chargement léger, pages directement lisibles par les moteurs de recherche et hébergement simple. Aucun compte, base de données ou secret nécessaire pour construire le site.

## Développement

Depuis `/workspace/Silo-trading-quipment` :

```sh
npm run build
npm test
npm run dev
```

Le serveur utilise le port 3000 (ou `PORT`). Relancer après modification des fichiers sources. Les fichiers publiables sont dans `dist/`. Ne pas modifier directement ce répertoire généré.

## Coordonnées et photographies

Modifier `src/company.json` :

- `whatsapp` : numéro international, chiffres seulement, sans `+`, espaces ou tirets.
- `phone` : numéro d’appel réel avec indicatif international.
- `email` : adresse professionnelle réelle.
- `url` : origine HTTPS publique définitive, sans chemin, après attribution par l’hébergeur. Sans ce champ, l’indexation est désactivée et aucun domaine n’est inventé.
- `logo` : `/images/logo-officiel.webp` une fois le fichier ajouté.
- `teamPhoto` et `teamBackPhoto` : chemins des photographies officielles ajoutées sous `public/images/`.
- `projects` : liste de réalisations réelles au format `{"title":"Description exacte", "image":"/images/installation.webp"}`. Ajouter uniquement des réalisations confirmées.

Les images partagées dans la conversation ont été examinées visuellement mais ne sont pas encore accessibles sous forme de fichiers dans ce checkout. Les emplacements actuels sont des blocs typographiques, sans faux logo ni photographie de remplacement. Ajouter les originaux avant publication. Conserver les originaux hors de `public/`, exporter des copies WebP de 960 à 1400 pixels de large, sans retouche de visage, uniforme ou logo. Préserver le ratio et vérifier le cadrage sur mobile. Aucun outil génératif n’est nécessaire.

Les services et textes des pages se modifient dans `scripts/build.mjs`, le style dans `public/style.css`, les interactions dans `public/app.js`. Les boutons WhatsApp des services adaptent le message automatiquement dès que le numéro est configuré.

## Formulaires

Les formulaires valident les champs puis préparent un message dans WhatsApp ou l’application e-mail du visiteur. L’utilisateur confirme l’envoi dans cette application. Ils ne prétendent jamais qu’un message a été livré et ne stockent pas de données sur le site. Un client e-mail installé est nécessaire pour `mailto:`. Les boutons sont désactivés si les coordonnées correspondantes ne sont pas renseignées. Pour une réception automatique depuis le site, il faudra connecter un prestataire de formulaires ou une API sécurisée et adapter la notice de confidentialité ; cette intégration n’est pas configurée.

## Déployer sur Netlify

1. Renseigner les coordonnées, intégrer les photos, vérifier les contenus et compléter la notice de confidentialité selon les pratiques réelles de l’entreprise.
2. Exécuter `npm run build` puis `npm test`.
3. Dans votre compte Netlify, importer ce dépôt Git (après avoir envoyé le code sur GitHub), ou déposer le dossier `dist` via le déploiement manuel Netlify. `netlify.toml` définit la commande de construction, le dossier public et les en-têtes de sécurité pour un déploiement connecté au dépôt. Pour un dépôt manuel, reprendre également ces en-têtes dans les paramètres de l’hébergeur.
4. Récupérer l’URL HTTPS attribuée, l’inscrire dans `src/company.json` (`url`), reconstruire et redéployer. Cela active les URL canoniques, le sitemap et l’indexation.
5. Vérifier l’URL publique et toutes les pages, les contacts et l’envoi réel des demandes avant annonce officielle.

Alternative Vercel : importer le dépôt comme projet « Other », commande `npm run build`, dossier de sortie `dist`. Configurer les mêmes en-têtes de sécurité depuis `netlify.toml` dans la configuration Vercel. Aucun déploiement n’a encore été effectué et aucune URL publique n’est fournie par ce projet local.

## Nom de domaine et Google

Ajouter votre domaine dans les paramètres du site chez l’hébergeur. Chez votre bureau d’enregistrement, appliquer exactement les enregistrements DNS affichés par celui-ci ; ne pas remplacer les enregistrements e-mail MX/TXT. Attendre la validation DNS et le certificat HTTPS, choisir la version principale (avec ou sans www), puis renseigner cette origine dans `url` et redéployer. Lier les variantes par redirection dans l’hébergement.

Créer une propriété Google Search Console pour le domaine, suivre la vérification DNS et soumettre `/sitemap.xml`. Les titres, descriptions et contenus locaux sont présents ; l’indexation et le classement ne sont pas garantis.

## État de livraison

Code développé : six pages métier, confidentialité, navigation mobile, formulaires, SEO conditionnel et configuration Netlify. Coordonnées configurées : WhatsApp et appels +243 85 811 02 05 ; e-mail siloeebbuilding@gmail.com. Restent indispensables : fichiers images accessibles, choix/accès hébergement et vérification du déploiement public. Ne jamais publier de clés ou mots de passe dans le dépôt.
