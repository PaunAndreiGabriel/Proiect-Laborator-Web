# Portofoliu Web — Andrei Gabriel Păun

Pagina personală/portofoliu statică care afișează informații de profil, educație, competențe și un portofoliu generat din repo-urile publice GitHub.

## Funcționalități

- Secțiune Profil: nume, rol, descriere, poză și linkuri (GitHub, LinkedIn, email, CV)
- Educație și competențe extrase din CV (fișier PDF inclus în proiect)
- Portofoliu: carduri de proiect preluate din GitHub (repo public)
- Fallback local de proiecte când API-ul nu este disponibil sau sunt limitări

## Tehnologii

- HTML5
- CSS3 (Grid, Flexbox)
- Vanilla JavaScript (fetch + DOM)
- GitHub REST API (public)

## Cerințe

- Browser modern (Chrome, Edge, Firefox) cu JavaScript activat
- Opțional: Python (sau alt server static) pentru servire locală (recomandat)

## Rulare locală (recomandat)

1. Deschide un terminal în directorul proiectului.
2. Pornește un server static (ex.: Python):

```bash
python -m http.server 8000
```

3. Deschide în browser: http://localhost:8000/index.html

Notă: deschiderea fișierului direct (`file://.../index.html`) în unele browsere poate bloca cererile `fetch` din motive de securitate; folosește un server local.

## Limitări GitHub API și autentificare

GitHub aplică limite de rată pentru cererile anonime (60 cereri/oră per IP). Dacă întâmpini erori legate de rate limit (HTTP 403) sau `Failed to fetch`, ai două opțiuni:

1. Folosește pagina cu fallback — proiectele locale vor fi afișate automat.
2. (Opțional) Folosește un Personal Access Token (PAT) pentru a mări limita. Creează un token pe GitHub (Settings → Developer settings → Personal access tokens) și adaugă-l temporar în `app.js` *doar local* astfel:

```js
// Înainte de fetch
const GITHUB_TOKEN = 'ghp_xxx_REPLACE_WITH_YOUR_TOKEN'; // NU comite acest token

// Apoi folosește:
fetch(url, { headers: { Authorization: `token ${GITHUB_TOKEN}` } })
```

Important: nu adăuga token-ul în repo public; folosește această metodă doar pentru dezvoltare locală.

## Structura proiectului

- `index.html` — pagina principală (entry point)
- `styles.css` — stiluri externe
- `app.js` — logica JavaScript pentru preluare și afișare repo-uri
- `CV_Paun_Andrei_Gabriel.pdf` — CV folosit ca sursă de conținut
- `README.md` — documentație (acest fișier)

## Deploy

Poți publica proiectul pe orice serviciu static (GitHub Pages, Vercel, Netlify). Pentru GitHub Pages:

1. Commit & push pe repository.
2. În GitHub → Settings → Pages: setează branch-ul (`main`) și folderul (`/` sau `/docs`).
3. Domeniul va fi generat automat (sau poți folosi un custom domain).

## Contribuții

Acest proiect este un portofoliu personal — contribuțiile sunt binevenite pentru îmbunătățiri stilistice sau bugfix-uri. Deschide un Issue sau Pull Request.

## Contact

- Email: andreigabriel.paun05@gmail.com
- GitHub: https://github.com/PaunAndreiGabriel

## Licență

MIT — vezi fișierul `LICENSE` (dacă vrei, pot adăuga unul).
