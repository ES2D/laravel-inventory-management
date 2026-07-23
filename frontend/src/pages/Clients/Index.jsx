import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

function ClientsIndex() {

    const [clients, setClients] =
        useState([]);

    useEffect(() => {

        api.get("/clients")
            .then((response) => {

                setClients(
                    response.data.data
                );

            })
            .catch(console.error);

    }, []);

    async function deleteClient(id) {

        if (
            !confirm(
                "¿Desea eliminar este cliente?"
            )
        ) {
            return;
        }

        try {

            await api.delete(
                `/clients/${id}`
            );

            setClients(
                clients.filter(
                    (client) =>
                        client.id !== id
                )
            );

            alert(
                "Cliente eliminado correctamente."
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data
                    ?.message ??
                "Error al eliminar el cliente."
            );
        }
    }

    return (
        <div className="card">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h1 className="mb-0">
                        Clientes
                    </h1>

                    <Link
                        to="/clients/create"
                        className="btn btn-success"
                    >
                        Nuevo Cliente
                    </Link>

                </div>

                <table className="table table-striped table-hover align-middle">

                    <thead className="table-dark">

                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {clients.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >
                                    No existen clientes registrados.
                                </td>

                            </tr>

                        ) : (

                            clients.map((client) => (

                                <tr key={client.id}>

                                    <td>
                                        {client.name}
                                    </td>

                                    <td>
                                        {client.document}
                                    </td>

                                    <td>
                                        {client.email ?? "-"}
                                    </td>

                                    <td>
                                        {client.phone ?? "-"}
                                    </td>

                                    <td>

                                        {client.is_active ? (

                                            <span className="badge bg-success">
                                                Activo
                                            </span>

                                        ) : (

                                            <span className="badge bg-secondary">
                                                Inactivo
                                            </span>

                                        )}

                                    </td>

                                    <td>

                                        <Link
                                            to={`/clients/${client.id}/edit`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteClient(
                                                    client.id
                                                )
                                            }
                                        >
                                            Eliminar
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ClientsIndex;
