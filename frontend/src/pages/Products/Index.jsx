import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

function ProductsIndex() {

    const [products, setProducts] = useState([]);

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
        <div>

            <h1>Productos</h1>

            <Link to="/products/create">
                Nuevo Producto
            </Link>

            <br />
            <br />

            <table border="1">

                <thead>

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
                                    >
                                        Editar
                                    </Link>

                                    {" | "}

                                    <button
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
    );
}

export default ProductsIndex;
