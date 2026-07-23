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
        return (
            <div
                className="text-center"
            >
                <div
                    className="spinner-border"
                    role="status"
                />

                <p className="mt-2">
                    Cargando...
                </p>
            </div>
        );
    }

    return (
        <div className="card">

            <div className="card-body">

                <h1 className="mb-4">
                    Pedido #{order.id}
                </h1>

                <div className="row mb-4">

                    <div className="col-md-4">

                        <strong>
                            Cliente
                        </strong>

                        <p className="mb-0">
                            {order.client.name}
                        </p>

                    </div>

                    <div className="col-md-4">

                        <strong>
                            Fecha
                        </strong>

                        <p className="mb-0">
                            {order.order_date}
                        </p>

                    </div>

                    <div className="col-md-4">

                        <strong>
                            Estado
                        </strong>

                        <p className="mb-0">

                            {order.status ===
                                "Pendiente" && (
                                    <span className="badge bg-warning text-dark">
                                        Pendiente
                                    </span>
                                )}

                            {order.status ===
                                "En proceso" && (
                                    <span className="badge bg-info">
                                        En proceso
                                    </span>
                                )}

                            {order.status ===
                                "Completado" && (
                                    <span className="badge bg-success">
                                        Completado
                                    </span>
                                )}

                            {order.status ===
                                "Cancelado" && (
                                    <span className="badge bg-danger">
                                        Cancelado
                                    </span>
                                )}

                        </p>

                    </div>

                </div>

                <table className="table table-striped table-hover">

                    <thead className="table-dark">

                        <tr>
                            <th>
                                Producto
                            </th>

                            <th>
                                Precio
                            </th>

                            <th>
                                Cantidad
                            </th>

                            <th>
                                Subtotal
                            </th>
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

                <div className="d-flex justify-content-end mb-4">

                    <h3 className="mb-0">
                        Total:
                        {" "}
                        $
                        {Number(
                            order.total
                        ).toFixed(2)}
                    </h3>

                </div>

                {order.status !==
                    "Completado" &&
                    order.status !==
                    "Cancelado" && (

                        <div className="mb-4">

                            <button
                                className="btn btn-primary me-2"
                                onClick={
                                    changeStatus
                                }
                            >
                                Cambiar Estado
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={
                                    cancelOrder
                                }
                            >
                                Cancelar Pedido
                            </button>

                        </div>

                    )}

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate(
                            "/orders"
                        )
                    }
                >
                    Volver
                </button>

            </div>

        </div>
    );
}

export default OrdersShow;
