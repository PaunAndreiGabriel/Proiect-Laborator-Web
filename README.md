# Portofoliu Web

Portofoliu personal cu profil, educație, experiență și portofoliu GitHub încărcat dinamic prin GitHub API.

## Descriere

Aplicația afișează:

- secțiune de profil cu nume, rol, descriere și fotografie
- tehnologii preferate și rezumat vizual al profilului
- educație și experiență relevantă
- carduri de proiect preluate din GitHub API
- fallback local dacă API-ul nu răspunde sau există limită de cereri

## Tehnologii folosite

- HTML5
- CSS3 cu Grid și Flexbox
- JavaScript vanilla
- GitHub REST API

## Rulare locală

1. Deschide folderul proiectului în VS Code.
2. Asigură-te că fișierul `CV_Paun_Andrei_Gabriel.pdf` este în rădăcina proiectului, dacă vrei ca butonul de CV să funcționeze.
3. Deschide `index.html` sau `proiect.html` în browser.

## Publicare gratuită

Proiectul este pregătit pentru publicare statică pe platforme gratuite:

### GitHub Pages

1. Încarcă fișierele în repository-ul GitHub.
2. Setează branch-ul de publicare pe `main` sau `gh-pages`.
3. Activează GitHub Pages din Settings > Pages.
4. Folosește `index.html` ca pagină de start.

### Vercel

1. Importă repository-ul în Vercel.
2. Nu este necesar build command pentru acest proiect static.
3. Lasă root-ul proiectului și publică direct.

### Netlify

1. Importă repository-ul în Netlify.
2. Setează folderul de publicare la rădăcina proiectului.
3. Deploy-ul se face fără configurări suplimentare.

## Structura fișierelor

- `index.html` - intrarea principală pentru deploy
- `proiect.html` - pagina principală a portofoliului
- `README.md` - documentație și pași de rulare

## Observații

- Pagina citește repo-urile publice de pe GitHub pentru utilizatorul `PaunAndreiGabriel`.
- Dacă GitHub API răspunde cu eroare sau limită de cereri, se afișează un fallback local cu proiecte de rezervă.