import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import fimeLogo from "../../assets/images/oso.png";
import { useSignIn } from '../../hooks/useSignIn';
import { useAuth } from "../../context/AuthContext";

const SignIn: React.FC = () => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const { signIn, loading, error } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (user) {
        return <Navigate to="/UserManagment" replace />;
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const { ok } = await signIn(email, password);

        if (ok) {
            navigate("/UserManagment", { replace: true });
        } else {
            alert("Error al iniciar sesión: " + error);
        }
    }

    return (
        <div style={styles.bodylogin}>
            <div style={styles.loginContainer}>
                <img src={fimeLogo} alt="Logo FIME" style={styles.logo} />
                <h1 style={styles.h1}>Bienvenido al Sistema de Prestamo de Libros</h1>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Correo Electrónico:</label>
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Contraseña:</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            disabled={loading}
                        />
                    </div>

                    <button
                        style={{
                            ...styles.button,
                            backgroundColor: loading ? "#888" : styles.button.backgroundColor,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                        type="submit"
                        disabled={loading}
                        onMouseOver={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor =
                                    styles.buttonHover.backgroundColor!;
                            }
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor =
                                styles.button.backgroundColor!;
                        }}
                    >
                        {loading ? "Entrando..." : "Iniciar sesión"}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default SignIn;

const styles = {
    bodylogin: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
    },
    loginContainer: {
        backgroundColor: "#fff",
        padding: 40,
        borderRadius: 12,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        width: 500,
        textAlign: "center" as const,
    },
    logo: {
        width: 120,
        marginBottom: 25,
    },
    h1: {
        marginTop: 0,
        marginBottom: 25,
        color: "#2D723B",
    },

    inputGroup: {
        marginBottom: 20,
        textAlign: "left" as const,
    },
    label: {
        display: "block",
        marginBottom: 8,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 6,
        boxSizing: "border-box" as const,
        fontSize: 16,
    },

    button: {
        width: "100%",
        padding: 14,
        border: "none",
        backgroundColor: "#2D723B",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        borderRadius: 6,
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#1A4D29",
    },
    registerWrapper: {
        marginTop: 15,
    },
    registerLink: {
        color: "#2D723B",
        fontSize: 14,
        textDecoration: "underline",
    },
};
