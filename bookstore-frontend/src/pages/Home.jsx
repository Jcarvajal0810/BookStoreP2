import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getBooks } from '../services/catalogService';
import BookCard from '../components/books/BookCard';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar el catálogo de libros');
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p className="mt-3">Cargando libros...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container>
            <h1 className="mb-4">Catálogo de libros</h1>
            <Row>
                {books.map((book) => (
                    <Col key={book._id || book.id} sm={6} md={4} lg={3} className="mb-4">
                        <BookCard book={book} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
