import { Link, Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="container">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-3 rounded">

                <div className="container-fluid">

                    <Link
                        className="navbar-brand"
                        to="/"
                    >
                        Inventory System
                    </Link>

                    <div className="navbar-nav">

                        <Link
                            className="nav-link"
                            to="/categories"
                        >
                            Categorías
                        </Link>

                        <Link
                            className="nav-link"
                            to="/products"
                        >
                            Productos
                        </Link>

                        <Link
                            className="nav-link"
                            to="/clients"
                        >
                            Clientes
                        </Link>

                        <Link
                            className="nav-link"
                            to="/orders"
                        >
                            Pedidos
                        </Link>

                    </div>

                </div>

            </nav>

            <div className="mt-4">
                <Outlet />
            </div>

        </div>
    );
}

export default MainLayout;
