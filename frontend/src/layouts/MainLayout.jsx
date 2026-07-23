import { Outlet, Link } from "react-router-dom";

function MainLayout() {
    return (
        <div>
            <nav>
                <ul>
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
