import fimeLogo from "../../assets/images/oso.png";



const SignIn = () => {
    return (
        <div style={styles.bodylogin}>
            <div style={styles.loginContainer}>
                <img src={fimeLogo} alt="Logo FIME" style={styles.logo} />
                <h1 style={styles.h1}>Bienvenido</h1>

                <form id="login-form">
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Correo Electrónico:</label>
                        <input
                            type="text"
                            id="email"
                            name="username"
                            placeholder="Correo Electrónico"
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            required
                            style={styles.input}
                        />
                    </div>

                    <button
                        name="submit"
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            styles.buttonHover.backgroundColor!)
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = styles.button.backgroundColor!)
                        }
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div style={styles.registerWrapper}>
                    <a
                        href="pages/registro-prueba.html"
                        style={styles.registerLink}
                    >
                        ¿No tienes cuenta? Regístrate aquí
                    </a>
                </div>
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
        cursor: "pointer",
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