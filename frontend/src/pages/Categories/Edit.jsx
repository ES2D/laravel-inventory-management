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
        <div>
            <h1>
                Editar Categoría
            </h1>

            <hr />

            <div>
                <label>
                    Nombre
                </label>

                <br />

                <input
                    type="text"
                    value={name ?? ""}
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
                        description ?? ""
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
                    updateCategory
                }
            >
                Actualizar
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

export default CategoriesEdit;
