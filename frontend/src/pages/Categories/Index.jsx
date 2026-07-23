import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

function CategoriesIndex() {
    const [categories, setCategories] =
        useState([]);

    function loadCategories() {
        api.get("/categories")
            .then((response) => {
                setCategories(
                    response.data.data
                );
            })
            .catch(console.error);
    }

    useEffect(() => {
        loadCategories();
    }, []);

    async function deleteCategory(id) {
        if (
            !confirm(
                "¿Desea eliminar la categoría?"
            )
        ) {
            return;
        }

        try {
            await api.delete(
                `/categories/${id}`
            );

            setCategories(
                categories.filter(
                    (category) =>
                        category.id !== id
                )
            );

            alert(
                "Categoría eliminada correctamente."
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al eliminar la categoría."
            );
        }
    }

    return (
        <div className="card">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h1 className="mb-0">
                        Categorías
                    </h1>

                    <Link
                        to="/categories/create"
                        className="btn btn-success"
                    >
                        Nueva Categoría
                    </Link>

                </div>

                <table className="table table-striped table-hover align-middle">

                    <thead className="table-dark">

                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {categories.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="text-center"
                                >
                                    No existen categorías.
                                </td>

                            </tr>

                        ) : (

                            categories.map(
                                (category) => (

                                    <tr
                                        key={
                                            category.id
                                        }
                                    >

                                        <td>
                                            {
                                                category.id
                                            }
                                        </td>

                                        <td>
                                            {
                                                category.name
                                            }
                                        </td>

                                        <td>

                                            <Link
                                                className="btn btn-warning btn-sm me-2"
                                                to={`/categories/${category.id}/edit`}
                                            >
                                                Editar
                                            </Link>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    deleteCategory(
                                                        category.id
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>
                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default CategoriesIndex;
