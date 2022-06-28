# Proiect NodeJS

Proiectul NodeJS asigură comunicarea dintre baza de date PostgreSQL folosită și interfața platformei creată în React și reprezintă **partea de backend a platformei**. 

Crearea unui mediu NodeJS se realizează respectând următorii pași:
1. Se instalează NodeJS de pe [siteul oficial](https://nodejs.org/en/)
2. Se verifică în IDE dacă sunt instalate corespunzător NodeJS și Node Package Manager(NPM), folosind comenzile `node -v`, respectiv `npm -v`
3. Într-un folder nou creat, în terminal se folosește comanda `npm init` pentru a inițializa structura fișierelor din noul proiect
4. Se instalează pachetele suplimentare care vor fi utilizate în implementarea funcționalităților, cum ar fi `npm install express`

## Structură

- Folder **services**

Conține patru fișiere JavaScript în care se regăsește implementarea funcțiilor ce prelucrează datele din baza de date, folosind interogări SQL. Fiecare funcție returnează un răspuns ce conține datele necesare, iar astfel frontendul le poate interpreta și afișa.

- Folder **routes**

Se regăsesc toate rutele corespunzătoare apelării funcțiilor, prin formatul unei cereri HTTP de tip GET, POST sau DELETE. Efectele din React utilizează aceste URLuri și transmit parametrii necesari pentru realizarea acțiunii dorite.
