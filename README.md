# Proiect Web - Portofoliu

Informații rapide pentru testare locală:

- Pune fișierul `CV_Paun_Andrei_Gabriel.pdf` în același folder ca `proiect.html` pentru ca butonul "Descarcă CV" să funcționeze.
- Deschide `proiect.html` în browser (dublu-clic sau `File -> Open`).
- Pagina preia repo-urile publice de pe GitHub pentru utilizatorul `PaunAndreiGabriel`.

Limitări și soluții:

- GitHub are o limită de cereri neautentificate (rate limit). Dacă vezi o eroare legată de limită (403), folosește butonul "Reîncearcă" sau "Folosește fallback".
- Pentru o integrare stabilă poți crea un Personal Access Token (PAT) și să-ți configurezi un proxy/serverless (Express, Vercel Functions, Netlify Functions) care să adauge token-ul pe server, astfel încât token-ul să nu apară în frontend.

Sugestii:

- Daca vrei, pot configura un mic server proxy în Node.js care redirecționează cererile către GitHub cu PAT (trebuie să-mi spui dacă vrei asta și unde vei găzdui - local, Vercel, Netlify).