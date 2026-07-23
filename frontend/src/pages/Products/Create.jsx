import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import api from "../../services/api";

function ProductsCreate() {
    const navigate = useNavigate();

    const [categories, setCategories] =
        useState([]);

    const [form, setForm] =
        useState({
            name: "",
            sku: "",
            category_id: "",
            unit: "",
            purchase_price: "",
            sale_price: "",
            current_stock: "",
            minimum_stock: "",
            is_active: true,
        });

    useEffect(() => {
        api.get("/categories")
            .then((response) => {
                setCategories(
                    response.data.data
                );
            })
            .catch(console.error);
    }, []);

    async function saveProduct() {
        try {
            await api.post(
                "/products",
                form
            );

            alert(
                "Producto creado correctamente."
            );

            navigate(
                "/products"
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al crear el producto."
            );
        }
    }

    function handleChange(
        event
    ) {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm({
            ...form,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });
    }

    return (
        <div>
            <h1>Nuevo Producto</h1>

            <hr />

            <div>
                <label>Nombre</label>
                <br />

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>SKU</label>
                <br />

                <input
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Categoría</label>
                <br />

                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                >
                    <option value="">
                        Seleccione...
                    </option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <br />

            <div>
                <label>
                    Unidad de Medida
                </label>

                <br />

                <select
                    name="unit"
                    value={
                        form.unit_of_measure
                    }
                    onChange={handleChange}
                >
                    <option value="">
                        Seleccione...
                    </option>

                    <option value="Unidad">
                        Unidad
                    </option>

                    <option value="Caja">
                        Caja
                    </option>

                    <option value="Paquete">
                        Paquete
                    </option>

                    <option value="Par">
                        Par
                    </option>
                </select>
            </div>

            <br />

            <div>
                <label>
                    Precio Compra
                </label>

                <br />

                <input
                    type="number"
                    name="purchase_price"
                    value={
                        form.purchase_price
                    }
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>
                    Precio Venta
                </label>

                <br />

                <input
                    type="number"
                    name="sale_price"
                    value={form.sale_price}
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>Stock</label>

                <br />

                <input
                    type="number"
                    name="current_stock"
                    value={
                        form.current_stock
                    }
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>
                    Stock Mínimo
                </label>

                <br />

                <input
                    type="number"
                    name="minimum_stock"
                    value={
                        form.minimum_stock
                    }
                    onChange={handleChange}
                />
            </div>

            <br />

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={
                            form.is_active
                        }
                        onChange={handleChange}
                    />

                    {" "}Activo
                </label>
            </div>

            <br />

            <button
                onClick={saveProduct}
            >
                Guardar
            </button>

            {" "}

            <button
                onClick={() =>
                    navigate("/products")
                }
            >
                Volver
            </button>
        </div>
    );
}

export default ProductsCreate;
