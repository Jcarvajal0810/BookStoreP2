from ..config.database import inventory_collection

def check_stock(book_id: str):
    item = inventory_collection.find_one({'book_id': book_id})
    if item:
        return item['stock']
    return 0

def update_stock(book_id: str, quantity: int):
    inventory_collection.update_one(
        {'book_id': book_id},
        {'$set': {'stock': quantity}},
        upsert=True
    )
    return {'book_id': book_id, 'new_quantity': quantity}
