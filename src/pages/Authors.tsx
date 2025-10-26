

const Authors = () => {
    return (
        <div style={styles.bodyUsers}>
            <div style={styles.containerUsers}>
                <h1 style={styles.h1Users}>Gestionar Autores</h1>

                <div style={styles.searchContainer}>
                    <label htmlFor="searchInput" style={styles.searchLabel}>
                        Buscar:
                    </label>
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Buscar por ID o nombre..."
                        style={styles.searchInput}
                    />
                </div>

                <table id="userTable" style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Apellido</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* filas dinámicas van aquí */}
                    </tbody>
                </table>

                <div style={styles.buttonGroup}>
                    <button
                        id="addBtn"
                        style={styles.groupButton}
                        onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            styles.groupButtonHover.backgroundColor!)
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = styles.groupButton.backgroundColor!)
                        }
                    >
                        Agregar Autor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Authors;


const styles = {
    bodyUsers: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f8",
        padding: 20,
    },
    containerUsers: {
        maxWidth: "95%",
        margin: "auto",
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    },
    h1Users: {
        textAlign: "center" as const,
        color: "#2D723B",
        marginBottom: 25,
    },

    searchContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: 25,
        gap: 10,
    },
    searchLabel: {
        fontWeight: "bold",
        color: "#333",
    },
    searchInput: {
        flexGrow: 1,
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 6,
        fontSize: 16,
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

    buttonGroup: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 15,
    },
    groupButton: {
        padding: "12px 20px",
        border: "none",
        borderRadius: 6,
        backgroundColor: "#2D723B",
        color: "white",
        fontSize: 16,
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
    },
    groupButtonHover: {
        backgroundColor: "#1A4D29",
    },
};
