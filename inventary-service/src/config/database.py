from pymongo import MongoClient
import os

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/inventorydb')
client = MongoClient(MONGO_URI)
db = client.get_database()
inventory_collection = db['inventory']
