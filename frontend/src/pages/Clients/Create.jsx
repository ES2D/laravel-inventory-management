import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function ClientsCreate() {

    const navigate = useNavigate();

    const [form, setForm] =
        useState({
            name: "",
            document: "",
            email: "",
            phone: "",
            is_active: true,
        });

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

    async function saveClient() {

        try {

            await api.post(
                "/clients",
                form
            );

            alert(
                "Cliente creado correctamente."
            );

            navigate(
                "/clients"
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al crear el cliente."
            );
        }
    }

    return (
        <div>

            <h1>
                Nuevo Cliente
            </h1>

            <hr />

            <div>
                <label>
                    Nombre
                </label>

                <br />

                <input
                    name="name"
                    value={form.name}
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
                    saveClient
                }
            >
                Guardar
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

export default ClientsCreate;
