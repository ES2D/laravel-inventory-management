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

function ClientsEdit() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] =
        useState({
            name: "",
            document: "",
            email: "",
            phone: "",
            is_active: true,
        });

    const loadData =
        useCallback(() => {

            api.get(
                `/clients/${id}`
            )
                .then(
                    (
                        response
                    ) => {

                        const client =
                            response
                                .data
                                .data ??
                            response.data;

                        setForm({
                            name:
                                client.name ??
                                "",

                            document:
                                client.document ??
                                "",

                            email:
                                client.email ??
                                "",

                            phone:
                                client.phone ??
                                "",

                            is_active:
                                client.is_active ??
                                true,
                        });
                    }
                )
                .catch(
                    console.error
                );

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

        setForm(
            (prev) => ({
                ...prev,
                [name]:
                    type ===
                        "checkbox"
                        ? checked
                        : value,
            })
        );
    }

    async function updateClient() {

        try {

            await api.put(
                `/clients/${id}`,
                form
            );

            alert(
                "Cliente actualizado correctamente."
            );

            navigate(
                "/clients"
            );

        } catch (error) {

            console.error(
                error
            );

            alert(
                error.response
                    ?.data
                    ?.message ??
                "Error al actualizar el cliente."
            );
        }
    }

    return (
        <div>

            <h1>
                Editar Cliente
            </h1>

            <hr />

            <div>
                <label>
                    Nombre
                </label>

                <br />

                <input
                    name="name"
                    value={
                        form.name
                    }
                    onChange={
                        handleChange
                    }
                />
            </div>

            <br />

            <div>
                <label>
                    Documento
                </label>

                <br />

                <input
                    name="document"
                    value={
                        form.document
                    }
                    onChange={
                        handleChange
                    }
                />
            </div>

            <br />

            <div>
                <label>
                    Correo
                </label>

                <br />

                <input
                    type="email"
                    name="email"
                    value={
                        form.email
                    }
                    onChange={
                        handleChange
                    }
                />
            </div>

            <br />

            <div>
                <label>
                    Teléfono
                </label>

                <br />

                <input
                    name="phone"
                    value={
                        form.phone
                    }
                    onChange={
                        handleChange
                    }
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
                        onChange={
                            handleChange
                        }
                    />

                    {" "}
                    Activo

                </label>

            </div>

            <br />

            <button
                onClick={
                    updateClient
                }
            >
                Actualizar
            </button>

            {" "}

            <button
                onClick={() =>
                    navigate(
                        "/clients"
                    )
                }
            >
                Volver
            </button>

        </div>
    );
}

export default ClientsEdit;
