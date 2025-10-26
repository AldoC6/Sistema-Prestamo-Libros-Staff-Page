
const Genres = () => {
    return (
        <div style={styles.bodyAddBook}>
            <div style={styles.containerAddBook}>
                <h1 style={styles.h1AddBook}>Agregar Nuevo Género</h1>

                <form id="addBookForm">
                    <div style={styles.inputGroup}>
                        <label htmlFor="title" style={styles.label}>
                            Nombre del Género:
                        </label>
                        <input type="text" id="title" name="title" required style={styles.input} />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor!)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2D723B")}
                    >
                        Agregar Género
                    </button>
                </form>

                <table id="bookTable" style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows dinámicas aquí */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Genres;

const styles = {
    bodyAddBook: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f8",
        padding: 20,
    },
    containerAddBook: {
        maxWidth: 1000,
        margin: "50px auto",
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    },
    h1AddBook: {
        textAlign: "center" as const,
        color: "#2D723B",
        marginBottom: 25,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        display: "block",
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        width: "100%",
        padding: 12,
        border: "1px solid #ccc",
        borderRadius: 6,
        fontSize: 16,
        boxSizing: "border-box" as const,
    },
    button: {
        width: "100%",
        padding: "12px 20px",
        border: "none",
        borderRadius: 6,
        backgroundColor: "#2D723B",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        marginTop: 10,
    },
    buttonHover: {
        backgroundColor: "#1A4D29",
    },

    // tabla
    table: {
        width: "100%",
        borderCollapse: "collapse" as const,
        marginTop: 20,
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
};
