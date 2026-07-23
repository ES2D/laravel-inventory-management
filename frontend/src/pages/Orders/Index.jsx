import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function OrdersIndex() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get("/orders")
            .then((response) => {
                setOrders(response.data.data);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="card">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h1 className="mb-0">
                        Pedidos
                    </h1>

                    <Link
                        to="/orders/create"
                        className="btn btn-success"
                    >
                        Nuevo Pedido
                    </Link>

                </div>

                <table className="table table-striped table-hover align-middle">

                    <thead className="table-dark">

                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {orders.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >
                                    No existen pedidos registrados.
                                </td>

                            </tr>

                        ) : (

                            orders.map((order) => (

                                <tr key={order.id}>

                                    <td>
                                        {order.id}
                                    </td>

                                    <td>
                                        {
                                            order.client
                                                .name
                                        }
                                    </td>

                                    <td>
                                        {
                                            order.order_date
                                        }
                                    </td>

                                    <td>

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

                                    </td>

                                    <td>
                                        $
                                        {Number(
                                            order.total
                                        ).toFixed(
                                            2
                                        )}
                                    </td>

                                    <td>

                                        <Link
                                            className="btn btn-primary btn-sm"
                                            to={`/orders/${order.id}`}
                                        >
                                            Ver
                                        </Link>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default OrdersIndex;
