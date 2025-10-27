import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img
                variant="top"
                src={book.image || 'https://via.placeholder.com/150'}
                alt={book.name}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{book.name}</Card.Title>
                {book.author && <Card.Text className="text-muted">{book.author}</Card.Text>}
                <div className="mt-auto">
                    <h6 className="fw-bold">${book.price}</h6>
                    <Button as={Link} to={`/books/${book._id || book.id}`} variant="primary" size="sm">
                        Ver detalles
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
