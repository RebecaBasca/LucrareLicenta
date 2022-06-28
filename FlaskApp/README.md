# Proiect Flask

Aceasta componentă a proiectului se ocupă cu prelucrarea datelor din chestionar și aplicarea unui algoritm de machine learning asupra lor, cu scopul de a transmite rezultatul obținut sub formă de răspuns direct către React. Codul este implementat în Python, iar pentru a putea face legătura cu acesta, a fost necesar frameworkul Flask.

## Logica utilizată

Calea apelată din interfață, a cererii HTTP responsabile cu această funcționalitate, preia ca argument un JSON ce conține răspunsurile oferite de către utilizator în chestionar, iar apoi trimite răspunsul obținut în urma execuției funcției din fișierul ML.py. Predicția se poate realiza deoarece există fișierul deja antrenat prealabil din fișierul Google Colab [Licenta_alg_ML.ipynb](https://github.com/RebecaBasca/LucrareLicenta/blob/main/Licenta_alg_ML.ipynb), iar astfel, folosind algoritmul Random Forest, se poate genera un răspuns binar ce reprezintă nevoia clientului de a începe un tratament sau o terapie. 


## Requirements:
- click==8.1.3
- colorama==0.4.5
- Flask==2.1.2
- importlib-metadata==4.11.4
- itsdangerous==2.1.2
- Jinja2==3.1.2
- joblib==1.1.0
- MarkupSafe==2.1.1
- numpy==1.23.0
- pandas==1.4.3
- python-dateutil==2.8.2
- pytz==2022.1
- scikit-learn==1.1.1
- scipy==1.8.1
- six==1.16.0
- sklearn==0.0
- threadpoolctl==3.1.0
- Werkzeug==2.1.2
- zipp==3.8.0

