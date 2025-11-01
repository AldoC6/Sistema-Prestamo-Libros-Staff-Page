import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { supabase } from "../lib/supabase";
import { useAuthors } from "../hooks/useAuthors";
import { useGenres } from "../hooks/useGenres";

const AddBook = () => {
    const { authors } = useAuthors();
    const { genres } = useGenres();

    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [authorId, setAuthorId] = useState<number | null>(null);
    const [genreId, setGenreId] = useState<number | null>(null);
    const [pubDate, setPubDate] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!authorId || !genreId) {
            setErrorMsg("Selecciona un autor y un género");
            return;
        }
        if (!imageFile) {
            setErrorMsg("Por favor selecciona una imagen");
            return;
        }

        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            // 1️⃣ Insertar el libro
            const { data: libroInsert, error: libroError } = await supabase
                .from("Libros")
                .insert([
                    {
                        titulo: title,
                        ISBN: isbn,
                        autor_id: authorId,
                        genero_id: genreId,
                        fecha_publicacion: pubDate,
                    },
                ])
                .select("id_libro")
                .single();

            if (libroError) throw libroError;
            const libroId = libroInsert.id_libro;

            // 2️⃣ Subir imagen al Storage
            const fileExt = imageFile.name.split(".").pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`;
            const filePath = `portadas/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("libros")
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            // 3️⃣ Obtener URL pública
            const { data: publicUrlData } = supabase.storage
                .from("libros")
                .getPublicUrl(filePath);

            const imageUrl = publicUrlData.publicUrl;

            // 4️⃣ Insertar en tabla Images
            const { error: imageError } = await supabase
                .from("Images")
                .insert([{ libro_id: libroId, url: imageUrl }]);

            if (imageError) throw imageError;

            setSuccessMsg("✅ Libro agregado correctamente");
            setTitle("");
            setIsbn("");
            setAuthorId(null);
            setGenreId(null);
            setPubDate("");
            setImageFile(null);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || "Error al agregar el libro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.bodyAddBook}>
            <div style={styles.containerAddBook}>
                <h1 style={styles.h1AddBook}>Agregar nuevo libro</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título del libro</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Autor</Form.Label>
                        <Form.Select
                            value={authorId ?? ""}
                            onChange={(e) => setAuthorId(Number(e.target.value))}
                            required
                        >
                            <option value="">Selecciona un autor</option>
                            {authors.map((a) => (
                                <option key={a.id_autor} value={a.id_autor}>
                                    {a.first_name} {a.last_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Género</Form.Label>
                        <Form.Select
                            value={genreId ?? ""}
                            onChange={(e) => setGenreId(Number(e.target.value))}
                            required
                        >
                            <option value="">Selecciona un género</option>
                            {genres.map((g) => (
                                <option key={g.id_genero} value={g.id_genero}>
                                    {g.genero}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de publicación</Form.Label>
                        <Form.Control
                            type="date"
                            value={pubDate}
                            onChange={(e) => setPubDate(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Imagen de portada</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImageFile(
                                    (e.target as HTMLInputElement).files?.[0] || null
                                )
                            }
                            required
                        />
                    </Form.Group>

                    {loading && <Spinner animation="border" size="sm" />}
                    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                    {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

                    <Button variant="success" type="submit" disabled={loading}>
                        {loading ? "Agregando..." : "Agregar libro"}
                    </Button>
                </Form>
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
        maxWidth: 600,
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
};
