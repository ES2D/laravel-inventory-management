import {
    useEffect,
    useState,
    useCallback,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import api from "../../services/api";

function ProductsEdit() {
    const { id } = useParams();

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

    const loadData = useCallback(() => {

        api.get("/categories")
            .then((response) => {
                setCategories(
                    response.data.data
                );
            })
            .catch(console.error);

        api.get(`/products/${id}`)
            .then((response) => {

                const product =
                    response.data.data ??
                    response.data;

                setForm({
                    name:
                        product.name ?? "",
                    sku:
                        product.sku ?? "",
                    category_id:
                        product.category_id ??
                        "",
                    unit:
                        product.unit ?? "",
                    purchase_price:
                        product.purchase_price ??
                        "",
                    sale_price:
                        product.sale_price ??
                        "",
                    current_stock:
                        product.current_stock ??
                        "",
                    minimum_stock:
                        product.minimum_stock ??
                        "",
                    is_active:
                        product.is_active ??
                        true,
                });

            })
            .catch(console.error);

    }, [id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    function handleChange(
        event
    ) {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    }

    async function updateProduct() {
        try {

            await api.put(
                `/products/${id}`,
                form
            );

            alert(
                "Producto actualizado correctamente."
            );

            navigate(
                "/products"
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al actualizar el producto."
            );
        }
    }

    return (
        <div className="card">

            <div className="card-body">

                <h1 className="mb-4">
                    Editar Producto
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

                        {categories.map(
                            (category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Unidad
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
                    className="btn btn-primary me-2"
                    onClick={updateProduct}
                >
                    Actualizar
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate(
                            "/products"
                        )
                    }
                >
                    Volver
                </button>

            </div>

        </div>
    );
}

export default ProductsEdit;
