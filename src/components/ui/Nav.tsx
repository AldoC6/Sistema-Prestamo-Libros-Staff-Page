import { NavLink } from "react-router-dom";
import "../../styles/nav.css";


export const Nav = () => {
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
                </ul>
            </nav>
        </header>
    )
}