import { useEffect } from "react";
import api from "./services/api";

function App() {

    useEffect(() => {

        api.get("/categories")
            .then((response) => {

                console.log(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    return (
        <div>
            <h1>Inventory System</h1>
        </div>
    );
    <Layout>
        <RouterProvider
            router={router}
        />
    </Layout>
}

export default App;
