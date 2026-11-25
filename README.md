# Provill-Ker Kft. – weboldal-bemutató

Magyar nyelvű, reszponzív, egyoldalas bemutatkozó weboldal React és Vite használatával. Nincs háttérrendszer vagy adatgyűjtő űrlap.

## Indítás

```sh
npm install
npm run dev
```

## Éles változat

```sh
npm run build
npm run preview
```

A feltölthető statikus weboldal a `dist` mappába kerül.

## Képek

Az eredeti fotók az `assets` mappában maradnak. A weboldal a `public/images` mappa optimalizált, három méretben elkészített WebP képeit használja. Újragenerálás: `npm run images`.

A fotók illusztrációk. A referenciák szövegesen jelennek meg; a `ref.jpg` nincs felhasználva. A betűkészletek (Manrope és Inter) a Google Fonts szolgáltatásból töltődnek be, rendszerbetűs tartalékkal.

## Fő fájlok

- `src/main.jsx`: tartalom, navigáció és komponensek
- `src/styles.css`: arculat, reszponzív elrendezés és fókuszállapotok
- `index.html`: magyar nyelvű SEO-adatok
- `scripts/optimize-images.mjs`: képek optimalizálása
