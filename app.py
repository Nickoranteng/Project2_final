import json
import geojson
from flask import Flask, render_template, jsonify
import pandas as pd
import os
import requests
# import geopandas as gpd
import re
# SQL Alchemy
from sqlalchemy import create_engine
# PyMySQL 
import pymysql
pymysql.install_as_MySQLdb()
# Config variables
# Import your config file(s) and variable(s)
if is_heroku == True:
    # if IS_HEROKU is found in the environment variables, then use the rest
    # NOTE: you still need to set up the IS_HEROKU environment variable on Heroku (it is not there by default)
    remote_db_endpoint = os.environ.get('remote_db_endpoint')
    remote_db_port = os.environ.get('remote_db_port')
    remote_db_name = os.environ.get('remote_db_name')
    remote_db_user = os.environ.get('remote_db_user')
    remote_db_pwd = os.environ.get('remote_db_pwd')
else:
    # use the config.py file if IS_HEROKU is not detected
    from config import remote_db_endpoint, remote_db_port, remote_db_name, remote_db_user, remote_db_pwd

# %%
# Cloud MySQL Database Connection on AWS
cloud_engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")
# Create a remote database engine connection
cloud_conn = cloud_engine.connect()
# %%
app = Flask(__name__)

@app.route("/")
def index():

    # use render_template to serve up the index.html
    return render_template('index.html')

@app.route("/data")
def samples():

    data_json = open("static/data/Income_records.json", "r") 
    data_data = json.load(data_json)
    
   #This serves json data on us county economic data
    
    return data_data

@app.route("/us_county")
def us_county():

    data_json = open("static/data/uscounty.geojson", "r") 
    data_data = geojson.load(data_json)
    
    #This serves geodata on us county boundaries
    
    return data_data

@app.route("/us_states")
def county_county():

    data_json = open("static/data/usstate.geojson", "r") 
    data_data = geojson.load(data_json)
    
   #This serves geodata on us states boundaries
    
    return data_data

@app.route("/home_values")
def home_values(): 
    
    cwd = os.getcwd()
    
    home_values = pd.read_csv("static/data/zillow_home_values.csv")
    home_values_df = home_values.drop(columns = ["SizeRank", "StateName", "StateCodeFIPS", "MunicipalCodeFIPS"]).fillna(0)
    
    print(home_values_df)
    
    
    home_values_json = home_values_df.to_json(orient='records')
    
    return home_values_json

@app.route("/rental_pricing")
def rental_pricing(): 
    
    cwd = os.getcwd()

    rental_pricing = pd.read_csv("static/data/rent_price_city.csv")
    rental_draft = rental_pricing.drop(columns = ["City Code", "Metro", "Population Rank"]).fillna(0)

    rental_draft1 = rental_draft.groupby(["County", "State"])
    rental_draft2 = rental_draft1.mean()

    rental_pricing = rental_draft2.reset_index()

    rental_pricing_json = rental_pricing.to_json(orient="records")
    
    return rental_pricing_json  

@app.route("/sortedValues")
def sortedValues(): 
    cwd = os.getcwd()

    home_values = pd.read_csv("static/data/zillow_home_values.csv")

    home_values_df = home_values[['RegionName', 'State', '2020-12-31']].rename(columns={'2020-12-31': '2020 Home Values'})
    sorted_values = home_values_df.sort_values('2020 Home Values', ascending=False).reset_index()
    sorted_home = sorted_values.drop(columns="index").fillna(0)
    sorted_home_values = sorted_home.iloc[0:10]
    
    sorted_home_json = sorted_home_values.to_json(orient="records")

    return sorted_home_json
@app.route("/images")
def images():
        # Cloud MySQL Database Connection on AWS
    cloud_engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")
    # Create a remote database engine connection
    cloud_conn = cloud_engine.connect()
    county_image_data = pd.read_sql(
    '''
    select county_state,
    img_src,
    img_descr
    from county_images
    ''', cloud_conn) 
    data_data = county_image_data.to_json(orient="records")
    
   #This serves json data on us county reviews
    
    return data_data

@app.route("/reviews")
def reviews():
        # Cloud MySQL Database Connection on AWS
    cloud_engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")
    # Create a remote database engine connection
    cloud_conn = cloud_engine.connect()

    county_reviews_data = pd.read_sql(
    '''
    select county_state,
    town,
    comment
    from county_reviews
    ''', cloud_conn)
     
    data_data = county_reviews_data.to_json(orient="records")
    
   #This serves json data on us county reviews
    
    return data_data

@app.route("/geodata")
def geodata():
    
    data_json = open("static/data/compressed_zillow_with_county.geojson", "r") 
    data_data = geojson.load(data_json)

    #This serves geodata on us county boundaries

    return data_data

if __name__ == "__main__":
    app.run(debug=True)