import { useEffect, useState } from "react";
import api from "../../services/api";

function CategoriesIndex() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get("/categories")
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>Categorías</h1>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriesIndex;
