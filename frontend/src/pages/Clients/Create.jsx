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
        <div className="card">

            <div className="card-body">

                <h1 className="mb-4">
                    Nuevo Cliente
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
                        Documento
                    </label>

                    <input
                        className="form-control"
                        name="document"
                        value={form.document}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Correo
                    </label>

                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Teléfono
                    </label>

                    <input
                        className="form-control"
                        name="phone"
                        value={form.phone}
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
                    onClick={saveClient}
                >
                    Guardar
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/clients")
                    }
                >
                    Volver
                </button>

            </div>

        </div>
    );
}

export default ClientsCreate;
