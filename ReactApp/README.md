# Partea de frontend a aplicației

## Proiectul ReactJS

Conține toate elementele ce construiesc interfața prezentată utilizatorului prin care beneficiază de toate facilitățile oferite de platformă și este un mediu ce permite comunicarea cu partea de backend necesară.

Pentru a crea o aplicație React într-un IDE este nevoie de rularea comenzii `npx create-react-app my-app`, iar pentru a utiliza limbajul TypeScript există comanda  `npx create-react-app my-app --template typescript`, care inițializează un template în care fișierele au extensia .ts. După executarea acestei comenzi se creează structura inițială a proiectului și se instalează dependențele necesare.

Pentru a vizualiza proiectul în browser, la adresa [http://localhost:3001](http://localhost:3001), se utilizează în terminal comanda `npm start`, urmând ca fiecare modificare a codului să fie observată în timp real.



# Structură

## Folder SRC
 
 Conține tot ce este necesar realizării platformei și este format din:
 
 - Folder **api**
 
 Format din fișiere de tip TypeScript în care se inițializează toate rutele cererilor HTTP folosite pentru a comunica cu serverul, care sunt utilizate mai apoi pentru a popula paginile cu informații din baza de date, a modifica, a prelua și a șterge datele dorite.
 
 - Folder **assets**
 
 Conține elementele statice media afișate pe platformă, cum ar fi logoul cabinetului sau alte pictograme folosite.
 
 - Folder **components**
 
 Caracteristica principală a folosirii ReactJS este faptul că permite să fie codul împărțit în segmente de dimensiuni mai mici, reutilizabile. Astfel, în acest folder se găsesc mai multe componente definite separat ce sunt utilizate în realizarea paginilor, ce pot fi utilizate de câte ori se dorește. Câteva exemple dintre acestea ar fi componenta de footer, structura unui buton sau o componentă ce se ocupă cu inputurile completate de utilizatori.
 
 - Folder **screens**
 
 În screens se regăsește câte un folder separat pentru fiecare pagină din componența proiectului, deoarece fiecare dintre acestea conține un fișier cu sintaxă JSX, numit index.tsx, în care sunt definite în ordine elementele din pagină, un fișier hooks.ts, unde sunt definite constantele folosite și efectele ce vor avea loc la fiecare randare. Fișierele types definesc tipurile stricte ale variabilelor folosite, iar cele cu extensia .css conțin stilizarea unor componente, realizată separat pentru a păstra codul mai structurat.




