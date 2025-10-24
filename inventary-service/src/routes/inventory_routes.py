from fastapi import APIRouter
from ..controllers import inventory_controller

router = APIRouter()

@router.get('/{book_id}')
def get_stock(book_id: str):
    stock = inventory_controller.check_stock(book_id)
    return {'book_id': book_id, 'stock': stock}

@router.put('/{book_id}/{quantity}')
def put_stock(book_id: str, quantity: int):
    result = inventory_controller.update_stock(book_id, quantity)
    return result
