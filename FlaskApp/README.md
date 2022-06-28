# Proiect Flask

Aceasta componentă a proiectului se ocupă cu prelucrarea datelor din chestionar și aplicarea unui algoritm de machine learning asupra lor, cu scopul de a transmite rezultatul obținut sub formă de răspuns direct către React. Codul este implementat în Python, iar pentru a putea face legătura cu acesta, a fost necesar frameworkul Flask.

Pentru de a crea o aplicație Flask, este nevoie de un mediu local de programare Python3, cu Package Installer Python (PIP) instalat și un IDE în care să fie rulate următoarele comenzi:
1. Crearea și activarea unui mediu virtual care să conțină toate pachetele și librăriile necesare proiectului
- `pip install virtualenv`
- `virtualenv venv`
- `venv\Scripts\activate`
2. Instalarea frameworkului Flask
- `pip install Flask`

Pentru a rula aplicația creată se folosește în terminal comanda `flask run`, iar serverul va fi activ pe portul 5000.

Pachetele folosite și cerințele pentru funcționarea corectă a programului se regăsesc în fișierul [requirements.txt](https://github.com/RebecaBasca/LucrareLicenta/blob/main/FlaskApp/requirements.txt).

## Logica utilizată

Calea apelată din interfață, a cererii HTTP responsabile cu această funcționalitate, preia ca argument un JSON ce conține răspunsurile oferite de către utilizator în chestionar, iar apoi trimite răspunsul obținut în urma execuției funcției din fișierul ML.py. Predicția se poate realiza deoarece există fișierul deja antrenat prealabil din fișierul Google Colab [Licenta_alg_ML.ipynb](https://github.com/RebecaBasca/LucrareLicenta/blob/main/Licenta_alg_ML.ipynb), iar astfel, folosind algoritmul Random Forest, se poate genera un răspuns binar ce reprezintă nevoia clientului de a începe un tratament sau o terapie. 


