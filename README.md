# Projet QT - Groupe KROUATORU

## Sommaire
* [Équipe](#équipe)
* [Lancement du projet](#lancement-du-projet)
  * [Option 1 : Installer les dépendances nécessaires](#option-1--installer-les-dépendances-nécessaires)
    * [Installer Git](#installer-git)
    * [Installer Node.js et npm](#installer-nodejs-et-npm)
    * [Cloner le dépôt Git](#cloner-le-dépôt-git)
    * [Installer les dépendances du projet](#installer-les-dépendances-du-projet)
    * [Démarrer le projet](#démarrer-le-projet)
  * [Option 2 : Télécharger le fichier ZIP](#option-2--télécharger-le-fichier-zip)
    * [Télécharger le fichier ZIP](#télécharger-le-fichier-zip)
    * [Extraire le fichier ZIP](#extraire-le-fichier-zip)
    * [Installer les dépendances du projet](#installer-les-dépendances-du-projet)
    * [Démarrer le projet](#démarrer-le-projet)
   
* [Déploiement du projet sur Vercel](#deploy-projet)
* [Générer un QR Code](#qr-code)

# Équipe
Projet développé par :

* **VARGAS VILA Daniel** - IASD
* **RAMMAL Farah** - IASD
* **PUJADE Joffrey** - IASD
* **PAOLI Enzo** - GL

# Lancement du projet
Bienvenue dans le projet **ProjetQT** ! Ce guide vous aidera à installer et à démarrer le projet, même si vous n'avez aucune expérience en informatique.

## Option 1 : Installer les dépendances nécessaires

### Installer Git

#### Télécharger Git :
* Allez sur le site [Git](https://git-scm.com/).
* Téléchargez l'installateur pour votre système d'exploitation (Windows, macOS, Linux).

#### Installer Git :
* Ouvrez le fichier téléchargé et suivez les instructions d'installation.

### Installer Node.js et npm

#### Télécharger Node.js :
* Allez sur le site [Node.js](https://nodejs.org/).
* Téléchargez l'installateur LTS (version recommandée).

#### Installer Node.js :
* Ouvrez le fichier téléchargé et suivez les instructions d'installation.
* `npm` sera installé automatiquement avec Node.js.

### Cloner le dépôt Git

#### Ouvrir le terminal :
* **Sur Windows** : Cliquez sur le menu Démarrer, tapez "cmd" et appuyez sur Entrée.
* **Sur macOS** : Ouvrez Spotlight (Cmd + Espace), tapez "Terminal" et appuyez sur Entrée.

#### Cloner le dépôt :
```sh
git clone https://github.com/DaniVV02/ProjetQT
```

### Installer les dépendances du projet

#### Accéder au dossier du projet :
```sh
cd ProjetQT
```

#### Installer les dépendances :
```sh
npm install
```

### Démarrer le projet

#### Lancer le serveur de développement :
```sh
npm run dev
```

#### Accéder au projet :
Ouvrez votre navigateur web et allez à l'adresse suivante : [http://localhost:5173/](http://localhost:5173/).

## Option 2 : Télécharger le fichier ZIP

### Télécharger le fichier ZIP

#### Télécharger le fichier ZIP :
* Allez sur la page GitHub du projet : **ProjetQT**.
* Cliquez sur le bouton "Code" et sélectionnez "Download ZIP".

### Extraire le fichier ZIP

#### Extraire le fichier ZIP :
* Trouvez le fichier téléchargé sur votre ordinateur.
* Faites un clic droit sur le fichier et sélectionnez "Extraire tout...".
* Suivez les instructions pour extraire les fichiers dans un dossier.

### Installer les dépendances du projet

#### Ouvrir le terminal :
Suivez les mêmes instructions que dans l'**Option 1** pour ouvrir le terminal.

#### Accéder au dossier du projet :
```sh
cd chemin_vers_le_dossier/ProjetQT
```

#### Installer les dépendances :
```sh
npm install
```

### Démarrer le projet

#### Lancer le serveur de développement :
```sh
npm run dev
```

#### Accéder au projet :
Ouvrez votre navigateur web et allez à l'adresse suivante : [http://localhost:5173/](http://localhost:5173/).

# Déploiement du projet sur Vercel <a id="deploy-projet"></a>

Le projet **ProjetQT** est déployé automatiquement en ligne grâce à [Vercel](https://vercel.com/), une plateforme de déploiement rapide et gratuite pour les applications front-end.

### Étapes de déploiement

1. **Pousser le projet sur GitHub**  
   Le projet doit être hébergé sur un dépôt GitHub (ce qui est déjà le cas ici).
   Si ce n'est pas déjà fait :
   ```sh
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/ton-utilisateur/ton-projet.git
   git push -u origin main
   ```


3. **Créer un compte Vercel**  
   Rendez-vous sur [https://vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.

4. **Importer le projet**
   - Cliquez sur **"Add New Project"**.
   - Sélectionnez le dépôt GitHub `ProjetQT`.
   - Vercel détectera automatiquement le framework utilisé (ici **Vite + React**).
   - Cliquez sur "Import"


5. **Configurer le projet**  
   Les paramètres sont généralement détectés automatiquement, mais en cas de besoin, dans **Project Settings** - **Build and Deployment** :

   - **Framework Preset** : `Vite`
   - **Build Command** : `npm run build`
   - **Output Directory** : dist
   - **Install Command** : `npm install`
   - **Development Command** : vite

   Puis cliquez sur **Save**

7. **Lancer le déploiement**  
   Cliquez sur **Deploy**. En quelques secondes, votre projet sera disponible en ligne à l’adresse :  
    `https://nom-du-projet.vercel.app`

8. **Déploiement continu**  
   À chaque fois que vous poussez des modifications sur GitHub (`git push`) sur la branche **main**, Vercel met automatiquement à jour la version en ligne du projet.

#### Lien de notre projet déployé : 

https://projet-qt.vercel.app/

Votre projet est maintenant en ligne grâce à **Vercel**. Si vous souhaitez personnaliser l’URL ou gérer des environnements, explorez les paramètres du projet sur [Vercel](https://vercel.com/dashboard).

# Générer un QR Code <a id="qr-code"></a>

- Allez sur le site : `https://www.qr.io/`
- Insérez l'URL du site déployé : `https://projet-qt.vercel.app/`
- Décorez votre QR Code (ou pas)
- Puis cliquez sur **Download QR Code**
- Saisissez finalement une adresse e-mail valide pour recevoir votre QR Code

Vous avez accès maintenant à un tableau de bord personnalisé pour visualiser votre QR Code, ainsi que contrôler les activités associées à celui-ci.


#### Notre QR Code :

<img src="QRCodeQT.png" alt="Qr Code QT" width="400">



---
Félicitations ! Vous avez réussi à installer, déployer et démarrer le projet **ProjetQT**. Si vous avez des questions ou rencontrez des problèmes, n'hésitez pas à demander de l'aide !
