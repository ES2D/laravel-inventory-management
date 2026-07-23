import { useEffect, useState } from "react";
import api from "../../services/api";

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
        <div>
            <h1>Pedidos</h1>

            <table border="1">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order.id}>

                            <td>{order.id}</td>

                            <td>
                                {order.client.name}
                            </td>

                            <td>
                                {order.order_date}
                            </td>

                            <td>
                                {order.status}
                            </td>

                            <td>
                                ${order.total}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default OrdersIndex;
