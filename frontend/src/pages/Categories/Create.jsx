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
        <div>
            <h1>
                Nueva Categoría
            </h1>

            <hr />

            <div>
                <label>
                    Nombre
                </label>

                <br />

                <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                />
            </div>

            <br />

            <div>
                <label>
                    Descripción
                </label>

                <br />

                <textarea
                    value={
                        description
                    }
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />
            </div>

            <br />

            <button
                onClick={
                    saveCategory
                }
            >
                Guardar
            </button>

            {" "}

            <button
                onClick={() =>
                    navigate(
                        "/categories"
                    )
                }
            >
                Volver
            </button>
        </div>
    );
}

export default CategoriesCreate;
