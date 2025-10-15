# NotesApp

Application React Native (Expo) simple pour créer, éditer et supprimer des notes.

## Fonctionnalités
- Liste des notes avec date de création
- Ajout de note via une modale
- Édition et suppression d’une note
- Navigation entre Home et Notes

## Pile technique
- React Native + Expo
- @react-navigation/native + @react-navigation/stack
- react-native-gesture-handler, react-native-screens, react-native-safe-area-context

## Prérequis
- Node.js LTS et npm
- Expo CLI (optionnel): `npm i -g expo-cli`
- Android:
  - Soit l’app Expo Go sur votre téléphone
  - Soit Android Studio + un émulateur Android

## Installation
```powershell
git clone <url-du-repo>
cd NotesApp
npm install
```

Les dépendances de navigation sont déjà listées dans package.json. Si besoin:
```powershell
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler
```

## Démarrage
```powershell
npm start
```
Dans Expo:
- Appuyer sur a pour Android (ou scanner le QR code avec Expo Go)
- Appuyer sur w pour Web

Astuce (cache propre):
```powershell
npx expo start -c
```

## Utilisation
- Écran Home: bouton vers “My Notes”
- Écran Notes:
  - Bouton “+” pour ajouter une note (modale)
  - Sur chaque note: actions Éditer / Supprimer


## Structure du projet
```
NotesApp/
├── App.js
├── index.js
├── app.json
├── package.json
├── components/
│   ├── NoteItem.js
│   └── NoteInput.js
└── screens/
    ├── HomeScreen.js
    └── NotesScreen.js
```

