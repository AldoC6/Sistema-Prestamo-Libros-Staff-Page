import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de bootstrap

export default function AuthLayout() {
    return (
        <div className="auth-container">
            <Outlet />
        </div>
    );
}