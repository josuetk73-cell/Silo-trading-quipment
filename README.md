# SILOE TRADING EQUIPMENT

Site vitrine français à six pages, confidentialité et administration Decap CMS. Node.js 22 ou supérieur, validé avec Node 24. Génération HTML/CSS/JavaScript statique, compatible Netlify. Les visiteurs demandent des devis par WhatsApp ou e-mail ; aucun paiement ni gestion de stock n’est implémenté.

## Démarrage

Depuis `/workspace/Silo-trading-quipment` :

```sh
npm run build
npm test
npm run dev
```

Le serveur utilise le port 3000 (ou `PORT`). Relancer après modification. Les fichiers publiables sont dans `dist/`, généré à chaque construction ; ne pas modifier directement ce dossier. Aucune installation npm n’est nécessaire à la construction : le CMS est servi depuis les fichiers de la distribution officielle Decap 3.17.1 conservés sous `public/admin/vendor/` avec leurs licences et inventaire SHA-256. Les scripts d’administration ne sont chargés que sur `/admin/`.

## Administration sans code

Lire [ADMINISTRATION.md](ADMINISTRATION.md) : activation OAuth GitHub dans Netlify, première connexion, ajout d’images, gestion des contenus et publication. L’administration utilise le compte GitHub du gestionnaire et ses permissions sur `josuetk73-cell/Silo-trading-quipment`. Aucune connexion par mot de passe local, aucun accès anonyme et aucun secret dans le code. Chaque publication crée un commit ; Netlify doit être connecté à `main` pour reconstruire automatiquement. La connexion réelle et les sauvegardes depuis le CMS nécessitent l’activation OAuth par le propriétaire.

Dans l’interface, **Entreprise, contacts, logo et réalisations** gère les coordonnées et images principales ; **Textes, services, équipements et agents** gère les textes, prestations, prix et galeries. Les images envoyées dans le chat restent absentes du dépôt : le propriétaire peut désormais les téléverser directement dans l’administration après son activation. Aucun faux logo ou projet n’est ajouté.

## Sources et configuration

- `src/company.json` : nom, contacts, message et boutons WhatsApp, logo, photos principales, villes et réalisations.
- `src/content.json` : présentations, valeurs, services, équipements, photos des agents et titres/introductions/SEO des pages.
- `public/images/` : images publiques téléversées. JPG, PNG, WebP et AVIF, noms simples et moins de 5 Mo ; optimiser de préférence les copies avant téléversement, sans retouche de visage ou uniforme. Conserver les originaux sur votre appareil.
- `scripts/build.mjs` : génération des pages ; les textes saisis sont échappés en HTML, les chemins images sont validés, les fichiers manquants bloquent la construction.
- `public/style.css` et `public/app.js` : présentation et interactions publiques.
- `public/admin/config.json` : champs éditoriaux et backend GitHub, sans secret.
- `netlify.toml` et `public/_headers` : construction et en-têtes de sécurité ; la CSP plus permissive nécessaire au CMS est limitée à `/admin/*`.

WhatsApp : chiffres internationaux sans `+` ni espaces. Le texte `{service}` est remplacé par le service choisi dans le message configuré. Les prix sont du texte avec devise précisée par l’entreprise. Aucun montant n’est prédéfini.

## Formulaires et données

Les formulaires valident les champs puis préparent un message dans WhatsApp ou l’application e-mail du visiteur. L’utilisateur confirme l’envoi ; aucune livraison automatique n’est annoncée ni aucun message stocké sur le site. `mailto:` nécessite une application e-mail configurée. Pour une réception automatique côté serveur, une intégration supplémentaire serait nécessaire, avec adaptation de la notice de confidentialité.

## Déploiement et domaine

Netlify : connecter le dépôt GitHub, branche `main`, commande `npm run build`, dossier `dist`, Node 24. Voir [PUBLICATION.md](PUBLICATION.md). Le propriétaire indique l’adresse `https://siloetradingequipment.netlify.app` ; elle est configurée pour les liens canoniques et le sitemap, mais la vérification publique depuis Codex est bloquée par le proxy réseau. Ne pas confondre construction locale, envoi GitHub et déploiement Netlify réussi.

Un dépôt manuel de `dist` permet de consulter le site, mais ne permet pas les mises à jour automatiques du CMS : utiliser la connexion GitHub. Chaque changement publié dans l’admin apparaît après un nouveau déploiement réussi. Vérifier les journaux Netlify en cas d’erreur.

Pour un domaine personnalisé, l’ajouter dans Netlify, appliquer les DNS exactement indiqués sans effacer les enregistrements de messagerie, attendre le certificat HTTPS, puis modifier `url` dans les réglages du CMS. Ne jamais inventer un domaine. Le sitemap est `/sitemap.xml` ; l’administration en est exclue. Google Search Console peut servir à demander l’indexation, sans garantie de classement.

## Tests

`npm test` vérifie les liens, services et contacts, les règles d’accès configurées, puis reconstruit une copie temporaire avec ajouts/modifications/suppressions de contenus, prix et images pour vérifier leur propagation, l’échappement HTML et l’échec sur image manquante. Les vérifications Chromium locales couvrent les pages publiques sur trois tailles d’écran, les formulaires et l’écran de connexion CMS avec sa CSP. Aucun test local ne prouve l’autorisation OAuth réelle ou la réception d’un message externe. Le premier enregistrement authentifié et le redéploiement doivent être vérifiés avec le propriétaire.
