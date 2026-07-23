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
        <div className="card">

            <div className="card-body">

                <h1 className="mb-4">
                    Nuevo Producto
                </h1>

                <div className="mb-3">

                    <label className="form-label">
                        Nombre
                    </label>

                    <input
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        SKU
                    </label>

                    <input
                        className="form-control"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Categoría
                    </label>

                    <select
                        className="form-select"
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

                <div className="mb-3">

                    <label className="form-label">
                        Unidad de Medida
                    </label>

                    <select
                        className="form-select"
                        name="unit"
                        value={form.unit}
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

                <div className="mb-3">

                    <label className="form-label">
                        Precio Compra
                    </label>

                    <input
                        className="form-control"
                        type="number"
                        name="purchase_price"
                        value={form.purchase_price}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Precio Venta
                    </label>

                    <input
                        className="form-control"
                        type="number"
                        name="sale_price"
                        value={form.sale_price}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Stock
                    </label>

                    <input
                        className="form-control"
                        type="number"
                        name="current_stock"
                        value={form.current_stock}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Stock Mínimo
                    </label>

                    <input
                        className="form-control"
                        type="number"
                        name="minimum_stock"
                        value={form.minimum_stock}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-check mb-4">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="is_active"
                        checked={form.is_active}
                        onChange={handleChange}
                    />

                    <label className="form-check-label">
                        Activo
                    </label>

                </div>

                <button
                    className="btn btn-success me-2"
                    onClick={saveProduct}
                >
                    Guardar
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Volver
                </button>

            </div>

        </div>
    );
}

export default ProductsCreate;
