import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { createPayment, processPayment } from "../services/paymentService";

export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { total, orderId } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [reference, setReference] = useState(null);
    const [error, setError] = useState(null);
    const [processed, setProcessed] = useState(false);

    useEffect(() => {
        if (!total || !orderId) {
            setError("Faltan datos de la orden.");
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const payment = await createPayment({
                    reference: `ORDER-${orderId}`,
                    amount: total,
                    method: "PayU",
                });
                setReference(payment.reference || `ORDER-${orderId}`);
            } catch (err) {
                setError("Error al crear el pago");
            } finally {
                setLoading(false);
            }
        })();
    }, [total, orderId]);

    const handleProcess = async () => {
        setLoading(true);
        try {
            await processPayment(reference);
            setProcessed(true);
            setTimeout(() => navigate("/"), 2000);
        } catch {
            setError("Error procesando el pago");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner animation="border" className="mt-4" />;

    return (
        <Container className="mt-4">
            <h3>Pago con PayU simulado</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {processed && (
                <Alert variant="success">
                    Pago procesado correctamente 🎉
                </Alert>
            )}

            {!processed && (
                <>
                    <p>
                        <strong>Monto:</strong> ${total}
                    </p>
                    <p>
                        <strong>Referencia:</strong> {reference}
                    </p>
                    <Button onClick={handleProcess} variant="success" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Procesar pago"}
                    </Button>
                </>
            )}
        </Container>
    );
}
