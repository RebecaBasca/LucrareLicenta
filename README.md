# Platformă online pentru gestionarea unui cabinet de logopedie și psihoterapie

## Funcționalități platformă

Cabinetul oferă o prezentare concisă a echipei de terapeuți disponibili pentru terapie, oferta serviciilor de care dispune, împreună cu prețurile aferente, precum și alte informații de contact. Pe pagina principală se poate găsi un chestionar, care, după completarea sa de către client, generează o sugestie personalizată în funcție de răspunsurile date privind tipul de terapie pe care acesta ar fi indicat să îl urmeze, în cazul în care este recomandat să fie început un tratament. Toți utilizatorii au posibilitatea de a se programa online la o ședință de terapie, iar cei ce doresc să vizualizeze mai ușor programările personale, își pot crea un cont de utilizator. Aceste conturi sunt folositoare și pentru terapeuți, pentru a îi ajută să își administreze mai ușor programările, iar administratorul cabinetului deține un tip de cont special prin intermediu căruia gestionează datele despre servicii și terapeuți din baza de date. 


## Tehnologii folosite:

### Frontend :  ReactJS
Rulează pe portul: **3001**

 Conține în structura sa sintaxă de:
 - HTML
 - CSS
 - TypeScript
 - JSX

În folderul ReactApp se găsește implementarea interfeței utilizatorului, și conține toate elementele ce se regăsesc pe paginile platformei. Acesta asigură legătura cu partea de backend, definește designul și sttructura paginilor și implementează diferite funcționalități, fie prin intermediul funcțiilor definite în celelalte directoare, fie direct din structura proprie (ex: declanșarea unui email de confirmare în momentul confirmării programării).

### Backend :  NodeJS
Rulează pe portul: **3000**

 Conține în structura sa sintaxă de:
 - JavaScript

NodeJSApp conține proiectul NodeJS utilizat în proiect pentru definirea tuturor acțiunilor aplicate aspura informațiilor prezente în baza de date. Sunt prezente funcții ce modifică, adaugă, preiau sau șterg date, iar acestea sunt declanșate de utilizator prin intermediul proiectului React, folosindu-se diferite rute și metode HTTP diferite. 

### Integrare algoritm învățare automată :  Flask
Rulează pe portul: **5000**

 Conține în structura sa sintaxă de:
 - Python
 - 
 FlaskApp conține fișierele necesare prin care aplicația React transmite datele din chestionar și preia răspunsul generat în urma aplicării modelului antrenat de date asupra lor. Comunicarea dintre cele două proiecte re realizează prin cereri HTTP, cu rute special definite. 

### Baza de date folosită :  PostgreSQL


## Fișierul Licenta_alg_ML.ipynb
  Include conținutul unui fișier Google Colaboratory în care este implementat în Python un algoritm de învățare automată folosit pentru a crea predicțiile necesare generării unui răspuns în urma completării chestionarului de pe platformă. 
  Setul de date inițial folosit este preluat de la OSMH și poate fi găsit în forma sa înițială [aici](https://osmhhelp.org/research).
