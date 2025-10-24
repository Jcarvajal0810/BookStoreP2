# controlador simple en memoria (puedes cambiar a Mongo después)
fake_inventory = {
    'book-001': 10,
    'book-002': 4,
    'book-003': 0
}

def check_stock(book_id: str):
    # devuelve 0 si no existe
    return fake_inventory.get(book_id, 0)

def update_stock(book_id: str, quantity: int):
    fake_inventory[book_id] = quantity
    return {'book_id': book_id, 'new_quantity': quantity}
