from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def root():
    return {'status': 'ok'}

@router.get('/{book_id}')
def get_book(book_id: str):
    return {'book_id': book_id}

@router.get('/low-stock')
def low_stock():
    return {'low_stock': True}

@router.post('/')
def create_inventory(item: dict):
    return {'created': item}

@router.put('/{book_id}')
def update_inventory(book_id: str, data: dict):
    return {'updated': book_id, 'data': data}

@router.delete('/{book_id}')
def delete_inventory(book_id: str):
    return {'deleted': book_id}
