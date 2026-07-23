import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function CategoriesCreate() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] =
        useState("");

    async function saveCategory() {
        if (!name.trim()) {
            alert(
                "El nombre es obligatorio."
            );

            return;
        }

        try {
            await api.post(
                "/categories",
                {
                    name,
                    description,
                }
            );

            alert(
                "Categoría creada correctamente."
            );

            navigate(
                "/categories"
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al crear la categoría."
            );
        }
    }

    return (
        <div className="card">

            <div className="card-body">

                <h1 className="mb-4">
                    Nueva Categoría
                </h1>

                <div className="mb-3">

                    <label className="form-label">
                        Nombre
                    </label>

                    <input
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-4">

                    <label className="form-label">
                        Descripción
                    </label>

                    <textarea
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                </div>

                <button
                    className="btn btn-success me-2"
                    onClick={
                        saveCategory
                    }
                >
                    Guardar
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate(
                            "/categories"
                        )
                    }
                >
                    Volver
                </button>

            </div>

        </div>
    );
}

export default CategoriesCreate;
