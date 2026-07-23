import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function OrdersCreate() {
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);

    const [clientId, setClientId] = useState("");
    const [productId, setProductId] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [items, setItems] = useState([]);

    const [orderDate, setOrderDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const navigate = useNavigate();

    useEffect(() => {
        api.get("/clients")
            .then((response) => {
                setClients(response.data.data);
            })
            .catch(console.error);

        api.get("/products")
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch(console.error);
    }, []);

    function addProduct() {
        if (!productId) {
            alert("Seleccione un producto.");
            return;
        }

        if (quantity <= 0) {
            alert("Cantidad inválida.");
            return;
        }

        const product = products.find(
            (p) => p.id == productId
        );

        if (!product) {
            return;
        }

        const existingItem = items.find(
            (item) =>
                item.product_id == productId
        );

        if (existingItem) {
            setItems(
                items.map((item) => {
                    if (
                        item.product_id ==
                        productId
                    ) {
                        return {
                            ...item,
                            quantity:
                                item.quantity +
                                quantity,
                        };
                    }

                    return item;
                })
            );
        } else {
            setItems([
                ...items,
                {
                    product_id: product.id,
                    name: product.name,
                    price: Number(
                        product.sale_price
                    ),
                    quantity: quantity,
                },
            ]);
        }

        setProductId("");
        setQuantity(1);
    }

    function removeProduct(productId) {
        setItems(
            items.filter(
                (item) =>
                    item.product_id !==
                    productId
            )
        );
    }

    function calculateTotal() {
        return items.reduce(
            (total, item) => {
                return (
                    total +
                    item.price *
                    item.quantity
                );
            },
            0
        );
    }

    async function saveOrder() {
        if (!clientId) {
            alert("Seleccione un cliente.");
            return;
        }

        if (items.length === 0) {
            alert(
                "Debe agregar al menos un producto."
            );

            return;
        }

        try {
            await api.post("/orders", {
                client_id: clientId,
                order_date: orderDate,
                products: items,
            });

            alert(
                "Pedido creado correctamente."
            );

            navigate("/orders");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al crear el pedido."
            );
        }
    }

    return (
        <div className="card">

            <div className="card-body">

                <h1 className="mb-4">
                    Nuevo Pedido
                </h1>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Fecha
                        </label>

                        <input
                            className="form-control"
                            type="date"
                            value={orderDate}
                            onChange={(e) =>
                                setOrderDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Cliente
                        </label>

                        <select
                            className="form-select"
                            value={clientId}
                            onChange={(e) =>
                                setClientId(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                Seleccione...
                            </option>

                            {clients.map(
                                (client) => (
                                    <option
                                        key={
                                            client.id
                                        }
                                        value={
                                            client.id
                                        }
                                    >
                                        {
                                            client.name
                                        }
                                    </option>
                                )
                            )}
                        </select>

                    </div>

                </div>

                <hr />

                <h4 className="mb-3">
                    Agregar Producto
                </h4>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Producto
                        </label>

                        <select
                            className="form-select"
                            value={productId}
                            onChange={(e) =>
                                setProductId(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                Seleccione...
                            </option>

                            {products.map(
                                (product) => (
                                    <option
                                        key={
                                            product.id
                                        }
                                        value={
                                            product.id
                                        }
                                    >
                                        {
                                            product.name
                                        }
                                    </option>
                                )
                            )}
                        </select>

                    </div>

                    <div className="col-md-3 mb-3">

                        <label className="form-label">
                            Cantidad
                        </label>

                        <input
                            className="form-control"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    Number(
                                        e.target
                                            .value
                                    )
                                )
                            }
                        />

                    </div>

                    <div className="col-md-3 d-flex align-items-end mb-3">

                        <button
                            className="btn btn-primary w-100"
                            onClick={
                                addProduct
                            }
                        >
                            Agregar
                        </button>

                    </div>

                </div>

                <hr />

                <h4 className="mb-3">
                    Detalle del Pedido
                </h4>

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

                            <th>
                                Acción
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {items.length ===
                            0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center"
                                >
                                    No hay productos agregados.
                                </td>

                            </tr>

                        ) : (

                            items.map(
                                (item) => (

                                    <tr
                                        key={
                                            item.product_id
                                        }
                                    >

                                        <td>
                                            {
                                                item.name
                                            }
                                        </td>

                                        <td>
                                            $
                                            {item.price.toFixed(
                                                2
                                            )}
                                        </td>

                                        <td>
                                            {
                                                item.quantity
                                            }
                                        </td>

                                        <td>
                                            $
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toFixed(
                                                2
                                            )}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    removeProduct(
                                                        item.product_id
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>
                                )
                            )

                        )}

                    </tbody>

                </table>

                <div className="d-flex justify-content-end mb-4">

                    <h3 className="mb-0">

                        Total:
                        {" "}
                        $
                        {calculateTotal().toFixed(
                            2
                        )}

                    </h3>

                </div>

                <button
                    className="btn btn-success me-2"
                    onClick={
                        saveOrder
                    }
                >
                    Guardar Pedido
                </button>

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

export default OrdersCreate;
