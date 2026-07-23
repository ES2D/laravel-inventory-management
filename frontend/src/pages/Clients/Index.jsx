import { useEffect, useState } from "react";
import api from "../../services/api";

function ClientsIndex() {

    const [clients, setClients] = useState([]);

    useEffect(() => {

        api.get("/clients")
            .then((response) => {

                setClients(
                    response.data.data
                );

            })
            .catch(console.error);

    }, []);

    return (
        <div>

            <h1>Clientes</h1>

            <table border="1">

                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>

                <tbody>

                    {clients.map((client) => (

                        <tr key={client.id}>

                            <td>
                                {client.document}
                            </td>

                            <td>
                                {client.name}
                            </td>

                            <td>
                                {client.email}
                            </td>

                            <td>
                                {client.phone}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ClientsIndex;
