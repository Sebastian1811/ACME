from dotenv import load_dotenv
import os

load_dotenv()

user = os.environ['DATABASE_USER']
password = os.environ['DATABASE_PASSWORD']
db = os.environ['DATABASE']
host = os.environ['DATABASEHOST']
port = os.environ['DATABASEPORT']

DATABASE_CONNECTION_URI = f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{db}'
