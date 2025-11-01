import { useLoans } from "../hooks/useLoans";

const LoansManagment = () => {
    const { loans, loading, error } = useLoans();

    return (
        <div style={styles.bodyLoansManagement}>
            <div style={styles.containerLoansManagement}>
                <h1 style={styles.h1LoansManagment}>Gestionar préstamos</h1>

                {loading && <p>Cargando préstamos...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                {!loading && !error && (
                    <table id="loansTable" style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Libro</th>
                                <th style={styles.th}>Usuario</th>
                                <th style={styles.th}>Fecha Inicio</th>
                                <th style={styles.th}>Fecha Devolución</th>
                                <th style={styles.th}>Estado</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((p) => (
                                <tr key={p.id_prestamo}>
                                    <td style={styles.td}>{p.id_prestamo}</td>
                                    <td style={styles.td}>
                                        {p.Libros ? p.Libros.titulo : "—"}
                                    </td>
                                    <td style={styles.td}>
                                        {p.Usuarios
                                            ? `${p.Usuarios.first_name} ${p.Usuarios.last_name}`
                                            : "—"}
                                    </td>
                                    <td style={styles.td}>{p.fecha_inicio}</td>
                                    <td style={styles.td}>{p.fecha_devolucion}</td>
                                    <td style={styles.td}>
                                        {p.Estados ? p.Estados.estado : "—"}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            style={{
                                                ...styles.actionBtnBase,
                                                ...styles.returnBtn,
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.returnBtnHover.backgroundColor!
                                            )
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.returnBtn.backgroundColor!
                                            )
                                            }
                                        >
                                            Marcar devuelto
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default LoansManagment;

const styles = {
    bodyLoansManagement: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f8",
        padding: 20,
    },
    containerLoansManagement: {
        maxWidth: 800,
        margin: "auto",
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    },
    h1LoansManagment: {
        textAlign: "center" as const,
        color: "#2D723B",
        marginBottom: 25,
    },

    table: {
        width: "100%",
        borderCollapse: "collapse" as const,
        marginBottom: 25,
    },
    th: {
        border: "1px solid #e0e0e0",
        padding: 15,
        textAlign: "left" as const,
        backgroundColor: "#E6F3EA",
        color: "#2D723B",
        fontWeight: "bold",
    },
    td: {
        border: "1px solid #e0e0e0",
        padding: 15,
        textAlign: "left" as const,
    },

    actionBtnBase: {
        padding: "8px 12px",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
    },
    returnBtn: {
        backgroundColor: "#2D723B",
        color: "#fff",
    },
    returnBtnHover: {
        backgroundColor: "#1A4D29",
    },
};
