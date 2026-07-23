import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

function ProductsIndex() {

    const [products, setProducts] =
        useState([]);

    useEffect(() => {

        api.get("/products")
            .then((response) => {

                setProducts(
                    response.data.data
                );

            })
            .catch(console.error);

    }, []);

    async function deleteProduct(id) {

        if (
            !confirm(
                "¿Desea eliminar este producto?"
            )
        ) {
            return;
        }

        try {

            await api.delete(
                `/products/${id}`
            );

            setProducts(
                products.filter(
                    (product) =>
                        product.id !== id
                )
            );

            alert(
                "Producto eliminado correctamente."
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al eliminar el producto."
            );
        }
    }

    return (
        <div className="card">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h1 className="mb-0">
                        Productos
                    </h1>

                    <Link
                        to="/products/create"
                        className="btn btn-success"
                    >
                        Nuevo Producto
                    </Link>

                </div>

                <table className="table table-striped table-hover align-middle">

                    <thead className="table-dark">

                        <tr>
                            <th>SKU</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {products.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center"
                                >
                                    No existen productos registrados.
                                </td>
                            </tr>

                        ) : (

                            products.map((product) => (

                                <tr key={product.id}>

                                    <td>
                                        {product.sku}
                                    </td>

                                    <td>
                                        {product.name}
                                    </td>

                                    <td>
                                        {
                                            product
                                                .category
                                                ?.name
                                        }
                                    </td>

                                    <td>
                                        $
                                        {
                                            product.sale_price
                                        }
                                    </td>

                                    <td>
                                        {
                                            product.current_stock
                                        }
                                    </td>

                                    <td>

                                        <Link
                                            to={`/products/${product.id}/edit`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteProduct(
                                                    product.id
                                                )
                                            }
                                        >
                                            Eliminar
                                        </button>

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

export default ProductsIndex;
