import { useEffect, useState } from 'react';
import { getCart, clearCart } from '../services/cartService';
import { Container, Table, Button, Spinner } from 'react-bootstrap';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = 'demoUser123'; // luego se reemplaza por el id del usuario autenticado

    useEffect(() => {
        (async () => {
            try {
                const data = await getCart(userId);
                setCart(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleClear = async () => {
        await clearCart(userId);
        setCart([]);
    };

    if (loading) return <Spinner animation="border" />;

    return (
        <Container className="mt-4">
            <h2>Mi carrito</h2>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Libro</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.bookId}>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="danger" onClick={handleClear}>
                        Vaciar carrito
                    </Button>
                </>
            )}
            <Button variant="success" onClick={() => navigate("/checkout")}>
                Proceder al pago
            </Button>
        </Container>
    );
}
