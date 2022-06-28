import pandas as pd
import joblib


y_pred_class = []


def MLAlgorithm(formData):

    my_test = formData
    dataframe_mytest = pd.DataFrame(eval(my_test), index=[9999])

    filename = 'static/finalized_model2.sav'
    my_forest = joblib.load(filename)


    global y_pred_class
    y_pred_class = my_forest.predict(dataframe_mytest)

    return  int(y_pred_class[0])

