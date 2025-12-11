# 🦇 Ciné-Club de l'Horreur

Site d'invitation pour le ciné-club d'horreur.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## Configuration

### 1. Images des chauves-souris

Place tes images dans le dossier `public/` :
- `bat-left.png` — chauve-souris de gauche (aile droite visible)
- `bat-right.png` — chauve-souris de droite (aile gauche visible)

**Tips :**
- Utilise des PNG avec fond transparent
- Les images vont se toucher au centre puis s'écarter
- Taille recommandée : 500-800px de large

### 2. Formspree

Dans `src/HorrorInvitation.jsx`, remplace `YOUR_FORM_ID` par ton endpoint Formspree :

```jsx
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

## Déploiement

```bash
npm run build
```

Le dossier `dist/` contient le site prêt à déployer (Vercel, Netlify, etc.)

## Structure

```
├── public/
│   ├── bat-left.png     # À ajouter
│   └── bat-right.png    # À ajouter
├── src/
│   ├── App.jsx
│   ├── HorrorInvitation.jsx
│   ├── index.css
│   └── main.jsx
└── index.html
```
