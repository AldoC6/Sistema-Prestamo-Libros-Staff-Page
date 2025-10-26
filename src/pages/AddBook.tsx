
const AddBook = () => {
    return (
        <div style={styles.bodyAddBook}>
            <div style={styles.containerAddBook}>
                <h1 style={styles.h1AddBook}>Agregar nuevo libro</h1>
                <form action="post" id="addBookForm">
                    <div style={styles.inputGroup}>
                        <label htmlFor="title" style={styles.label}>
                            Titulo del libro:
                        </label>
                        <input type="text" name="title" id="title" required style={styles.input} />

                        <label htmlFor="ISBN" style={styles.label}>
                            ISBN
                        </label>
                        <input type="text" name="ISBN" id="ISBN" required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="autor" style={styles.label}>
                            Autor
                        </label>
                        <select name="autor" id="autor" required style={styles.input}></select>

                        <label htmlFor="genero" style={styles.label}>
                            Género
                        </label>
                        <select name="genero" id="genero" required style={styles.input}></select>

                        <label htmlFor="fecha_pub" style={styles.label}>
                            Fecha de publicación
                        </label>
                        <input type="date" name="fecha_pub" id="fecha_pub" required style={styles.input} />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor!)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2D723B")}
                    >
                        Agregar Libro
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;


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
        marginBottom: 10,
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
    },
    buttonHover: {
        backgroundColor: "#1A4D29",
    },
};
