import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Image } from 'react-bootstrap';
import { getBookById } from '../services/catalogService';
import { CartContext } from '../contexts/CartContext';

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        async function fetchBook() {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (err) {
                setError('Error al obtener los detalles del libro.');
            } finally {
                setLoading(false);
            }
        }
        fetchBook();
    }, [id]);

    if (loading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p className="mt-3">Cargando detalles...</p>
            </div>
        );

    if (error) return <Alert variant="danger">{error}</Alert>;

    if (!book) return <p>Libro no encontrado.</p>;

    return (
        <Container className="mt-4">
            <Row>
                <Col md={5}>
                    <Image
                        src={book.image || 'https://via.placeholder.com/250'}
                        alt={book.name}
                        fluid
                        rounded
                    />
                </Col>
                <Col md={7}>
                    <h2>{book.name}</h2>
                    {book.author && <p className="text-muted">Autor: {book.author}</p>}
                    <p>{book.description || 'Sin descripción disponible.'}</p>
                    <h4 className="mt-3">${book.price}</h4>
                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={() => addToCart(book)}
                    >
                        Agregar al carrito
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
