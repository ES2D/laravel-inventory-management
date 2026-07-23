import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import api from "../../services/api";

function CategoriesEdit() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] =
        useState("");

    useEffect(() => {
        api.get(`/categories/${id}`)
            .then((response) => {
                console.log(response.data);

                const category =
                    response.data.data ??
                    response.data;

                setName(
                    category.name ?? ""
                );

                setDescription(
                    category.description ??
                    ""
                );
            })
            .catch(console.error);
    }, [id]);

    async function updateCategory() {
        try {
            await api.put(
                `/categories/${id}`,
                {
                    name,
                    description,
                }
            );

            alert(
                "Categoría actualizada."
            );

            navigate(
                "/categories"
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al actualizar."
            );
        }
    }

    return (
        <div className="card">

            <div className="card-body">

                <h1 className="mb-4">
                    Editar Categoría
                </h1>

                <div className="mb-3">

                    <label className="form-label">
                        Nombre
                    </label>

                    <input
                        className="form-control"
                        type="text"
                        value={name ?? ""}
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
                        value={
                            description ?? ""
                        }
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                </div>

                <button
                    className="btn btn-primary me-2"
                    onClick={
                        updateCategory
                    }
                >
                    Actualizar
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

export default CategoriesEdit;
