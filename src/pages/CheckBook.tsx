
const CheckBook = () => {
    return (
        <div style={styles.bodyCheckBook}>
            <div style={styles.containerCheckBook}>
                <h1 style={styles.h1CheckBook}>Consultar disponibilidad de libros</h1>

                <div style={styles.searchContainer}>
                    <label htmlFor="searchInput" style={styles.searchLabel}>
                        Buscar:
                    </label>
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Buscar por título..."
                        style={styles.searchInput}
                    />
                </div>

                <table id="booksTable" style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Título</th>
                            <th style={styles.th}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* filas dinámicas */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CheckBook;


const styles = {
    bodyCheckBook: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f8",
        padding: 20,
    },
    containerCheckBook: {
        maxWidth: 800,
        margin: "auto",
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    },
    h1CheckBook: {
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
};

