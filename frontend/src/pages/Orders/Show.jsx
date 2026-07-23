import {
    useEffect,
    useState,
    useCallback
} from "react";
import {
    useParams,
    useNavigate,
} from "react-router-dom";



import api from "../../services/api";

function OrdersShow() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const loadOrder = useCallback(() => {
    api.get(`/orders/${id}`)
        .then((response) => {
            setOrder(response.data);
        })
        .catch(console.error);
}, [id]);

useEffect(() => {
    loadOrder();
}, [loadOrder]);

    async function changeStatus() {
        try {
            await api.patch(
                `/orders/${id}/status`
            );

            alert(
                "Estado actualizado."
            );

            loadOrder();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al actualizar el estado."
            );
        }
    }

    async function cancelOrder() {
        try {
            await api.patch(
                `/orders/${id}/cancel`
            );

            alert(
                "Pedido cancelado."
            );

            loadOrder();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al cancelar el pedido."
            );
        }
    }

    if (!order) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>
                Pedido #{order.id}
            </h1>

            <p>
                <strong>Cliente:</strong>{" "}
                {order.client.name}
            </p>

            <p>
                <strong>Fecha:</strong>{" "}
                {order.order_date}
            </p>

            <p>
                <strong>Estado:</strong>{" "}
                {order.status}
            </p>

            <hr />

            <table border="1">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    {order.details.map(
                        (detail) => (
                            <tr
                                key={
                                    detail.id
                                }
                            >
                                <td>
                                    {
                                        detail
                                            .product
                                            .name
                                    }
                                </td>

                                <td>
                                    $
                                    {Number(
                                        detail.unit_price
                                    ).toFixed(
                                        2
                                    )}
                                </td>

                                <td>
                                    {
                                        detail.quantity
                                    }
                                </td>

                                <td>
                                    $
                                    {Number(
                                        detail.subtotal
                                    ).toFixed(
                                        2
                                    )}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            <hr />

            <h3>
                Total: $
                {Number(
                    order.total
                ).toFixed(2)}
            </h3>

            <hr />

            {order.status !==
                "Completado" &&
                order.status !==
                "Cancelado" && (
                    <>
                        <button
                            onClick={
                                changeStatus
                            }
                        >
                            Cambiar
                            Estado
                        </button>

                        {" "}

                        <button
                            onClick={
                                cancelOrder
                            }
                        >
                            Cancelar
                            Pedido
                        </button>
                    </>
                )}

            <br />
            <br />

            <button
                onClick={() =>
                    navigate(
                        "/orders"
                    )
                }
            >
                Volver
            </button>
        </div>
    );
}

export default OrdersShow;
