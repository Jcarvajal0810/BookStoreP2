import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Alert, Spinner, Table } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { createOrder } from "../services/orderService";
import { clearCart } from "../services/cartService";

export default function CheckoutPage() {
    const { cart, setCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        if (!user) {
            setError("Debes iniciar sesión para realizar la compra.");
            return;
        }

        if (cart.length === 0) {
            setError("Tu carrito está vacío.");
            return;
        }

        setLoading(true);
        try {
            for (const item of cart) {
                await createOrder({
                    userId: user.username, // o user._id según tu modelo
                    book_id: item._id,
                    quantity: item.qty || 1,
                    price: item.price,
                });
            }

            await clearCart(user.username);
            setCart([]);
            setSuccess(true);
            navigate("/payment", { state: { total, orderId: "ORD-" + Date.now() } });
        } catch (err) {
            console.error(err);
            setError("Error procesando la orden. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const total = cart.reduce((acc, i) => acc + i.price * (i.qty || 1), 0);

    return (
        <Container className="mt-4">
            <h2>Resumen de compra</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Orden creada con éxito ✅</Alert>}

            {cart.length > 0 ? (
                <>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Libro</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.qty || 1}</td>
                                    <td>${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h4>Total: ${total.toFixed(2)}</h4>
                    <Button
                        variant="success"
                        onClick={handleCheckout}
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : "Finalizar compra"}
                    </Button>
                </>
            ) : (
                <p>No hay productos en tu carrito.</p>
            )}
        </Container>
    );
}
