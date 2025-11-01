import { useBooks } from "../hooks/useBooks";

const BooksManagment = () => {
    const { books, loading, error } = useBooks();

    return (
        <div style={styles.bodyBooks}>
            <div style={styles.containerBooks}>
                <h1 style={styles.h1Books}>Gestionar libros</h1>

                <div style={styles.buttonGroup}>
                </div>

                {loading && <p>Cargando libros...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                {!loading && !error && (
                    <table id="bookTable" style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Título</th>
                                <th style={styles.th}>ISBN</th>
                                <th style={styles.th}>Autor</th>
                                <th style={styles.th}>Género</th>
                                <th style={styles.th}>Fecha Publicación</th>
                                <th style={styles.th}>Portada</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((b) => (
                                <tr key={b.id_libro}>
                                    <td style={styles.td}>{b.id_libro}</td>
                                    <td style={styles.td}>{b.titulo}</td>
                                    <td style={styles.td}>{b.ISBN}</td>
                                    <td style={styles.td}>
                                        {b.Autores
                                            ? `${b.Autores.first_name} ${b.Autores.last_name}`
                                            : "—"}
                                    </td>
                                    <td style={styles.td}>
                                        {b.Generos ? b.Generos.genero : "—"}
                                    </td>
                                    <td style={styles.td}>
                                        {b.fecha_publicacion}
                                    </td>
                                    <td style={styles.td}>
                                        {b.Images && b.Images.length > 0 ? (
                                            <img
                                                src={b.Images[0].url}
                                                alt="Portada"
                                                style={{ width: 70, height: "auto", borderRadius: 6 }}
                                            />
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        {/* por ahora botones sin acción */}
                                        <button
                                            style={{ ...styles.actionBtnBase, ...styles.editBtn }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.editBtnHover.backgroundColor!
                                            )
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.editBtn.backgroundColor!
                                            )
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            style={{ ...styles.actionBtnBase, ...styles.deleteBtn }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.deleteBtnHover.backgroundColor!
                                            )
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.deleteBtn.backgroundColor!
                                            )
                                            }
                                        >
                                            Eliminar
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

export default BooksManagment;

// styles igual que ya tienes


const styles = {
    bodyBooks: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f8",
        padding: 20,
    },
    containerBooks: {
        maxWidth: "95%",
        margin: "auto",
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    },
    h1Books: {
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
        marginTop: 20,
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

    // botones acción por fila
    actionBtnBase: {
        padding: "8px 12px",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
        marginRight: 8,
    },
    editBtn: {
        backgroundColor: "#ffc107",
        color: "#333",
    },
    editBtnHover: {
        backgroundColor: "#e0a800",
    },
    deleteBtn: {
        backgroundColor: "#CC444B",
        color: "#fff",
    },
    deleteBtnHover: {
        backgroundColor: "#B3393D",
    },

    // grupo de botones generales (abajo, tipo "Agregar libro", etc.)
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
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    groupButtonHover: {
        backgroundColor: "#1A4D29",
    },
};
