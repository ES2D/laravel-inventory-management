import { useEffect, useState } from "react";
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

    return (
        <div>

            <h1>Productos</h1>

            <table border="1">

                <thead>

                    <tr>
                        <th>SKU</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>

                </thead>

                <tbody>

                    {products.map((product) => (

                        <tr key={product.id}>

                            <td>
                                {product.sku}
                            </td>

                            <td>
                                {product.name}
                            </td>

                            <td>
                                {product.category.name}
                            </td>

                            <td>
                                ${product.sale_price}
                            </td>

                            <td>
                                {product.current_stock}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ProductsIndex;
