# app.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained ML model
new_df = joblib.load('product_dict.pkl')  #new_df is dictionary
products = pd.DataFrame(new_df)
similarity = joblib.load('similarity.pkl')
# print(products['_id'].values)


def recommendation(productId):
  product_index = products[products["_id"] == productId].index[0]
  distances = similarity[product_index]
  products_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x: x[1])[20:35]
  recommend_product = []
  for i in products_list:
    recommend_product.append(products.iloc[i[0]]._id)
    # print(recommend_product)
  return recommend_product


# recommendation("66213cc8b41698340dff8532")

@app.route('/')
def hello():
  return f"/predict/66213cc8b41698340dff8532"


@app.route('/predict/')
@app.route('/predict/<prd_id>')
def predict(prd_id=None):
  rec=recommendation(prd_id)
  # print(rec)
  return f"{rec}"
    



# if __name__ == '__main__':
#   app.run(debug=True)
