# Partea de backend a platformei

Proiectul NodeJS asigură comunicarea dintre baza de date PostgreSQL folosită și interfața platformei creată în React.

## Structură

- Folder **services**

Conține patru fișiere JavaScript în care se regăsește implementarea funcțiilor ce prelucrează datele din baza de date, folosind interogări SQL. Fiecare funcție returnează un răspuns ce conține datele necesare, iar astfel frontendul le poate interpreta și afișa.

- Folder **routes**

Se regăsesc toate rutele corespunzătoare apelării funcțiilor, prin formatul unei cereri HTTP de tip GET, POST sau DELETE. Efectele din React utilizează aceste URLuri și transmit parametrii necesari pentru realizarea acțiunii dorite.
