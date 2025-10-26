import { Navigate, NavLink } from "react-router-dom";

import "../../styles/nav.css";
import { useAuth } from "../../context/AuthContext";


export const Nav = () => {

    const { signOut } = useAuth();

    async function handleLogout() {
        await signOut();
        <Navigate to="/" replace />;
    }
    return (
        <header className="main-nav">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/UserManagment" end>Gestionar Usuarios</NavLink>
                    </li>
                    <li>
                        <a href="https://www.facebook.com">Verificación Facial</a>
                    </li>
                    <li>
                        <NavLink to="/BooksManagment">Gestionar Libros</NavLink>
                    </li>
                    <li>
                        <NavLink to="/AddBook">Agregar Libro</NavLink>
                    </li>
                    <li>
                        <NavLink to="/LoansManagment">Gestionar Préstamos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/CheckBook">Consultar Libros</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Authors">Autores de libros</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Genres">Géneros </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleLogout} to="/">Cerrar Sesión</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}