import { Link, Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Inventory System</h1>

            <nav>
                <ul
                    style={{
                        display: "flex",
                        gap: "20px",
                        listStyle: "none",
                        padding: 0,
                    }}
                >
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>

                    <li>
                        <Link to="/categories">
                            Categorías
                        </Link>
                    </li>

                    <li>
                        <Link to="/products">
                            Productos
                        </Link>
                    </li>

                    <li>
                        <Link to="/clients">
                            Clientes
                        </Link>
                    </li>

                    <li>
                        <Link to="/orders">
                            Pedidos
                        </Link>
                    </li>
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}

export default MainLayout;
