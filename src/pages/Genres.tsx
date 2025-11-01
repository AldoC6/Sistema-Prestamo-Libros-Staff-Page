import { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { useGenres } from "../hooks/useGenres";
import { supabase } from "../lib/supabase";

const Genres = () => {
    const { genres, loading, error, refetch } = useGenres();

    // estado UI
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // estado modal crear
    const [showCreate, setShowCreate] = useState(false);
    const [newGenre, setNewGenre] = useState("");

    // estado modal editar
    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [editGenre, setEditGenre] = useState("");

    // abrir modal crear
    const openCreateModal = () => {
        setFormError(null);
        setNewGenre("");
        setShowCreate(true);
    };

    // cerrar modal crear
    const closeCreateModal = () => {
        if (!saving) {
            setShowCreate(false);
            setNewGenre("");
        }
    };

    // submit crear género
    const handleCreateGenre = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newGenre.trim()) {
            setFormError("Por favor ingresa el nombre del género.");
            return;
        }

        setSaving(true);
        setFormError(null);

        const { error: insertError } = await supabase
            .from("Generos")
            .insert([{ genero: newGenre.trim() }]);

        if (insertError) {
            console.error(insertError);
            setFormError(
                insertError.message || "No se pudo crear el género."
            );
            setSaving(false);
            return;
        }

        await refetch();

        setSaving(false);
        setShowCreate(false);
        setNewGenre("");
    };

    // abrir modal editar
    const openEditModal = (id: number, generoActual: string) => {
        setEditId(id);
        setEditGenre(generoActual);
        setFormError(null);
        setShowEdit(true);
    };

    // cerrar modal editar
    const closeEditModal = () => {
        if (!saving) {
            setShowEdit(false);
            setEditId(null);
            setEditGenre("");
        }
    };

    // submit editar género
    const handleEditGenre = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;

        if (!editGenre.trim()) {
            setFormError("Por favor ingresa el nombre del género.");
            return;
        }

        setSaving(true);
        setFormError(null);

        const { error: updateError } = await supabase
            .from("Generos")
            .update({ genero: editGenre.trim() })
            .eq("id_genero", editId);

        if (updateError) {
            console.error(updateError);
            setFormError(
                updateError.message || "No se pudo actualizar el género."
            );
            setSaving(false);
            return;
        }

        await refetch();

        setSaving(false);
        setShowEdit(false);
        setEditId(null);
        setEditGenre("");
    };

    // eliminar género
    const handleDeleteGenre = async (id: number) => {
        const ok = window.confirm(
            "¿Seguro que quieres eliminar este género?"
        );
        if (!ok) return;

        setSaving(true);
        setFormError(null);

        const { error: deleteError } = await supabase
            .from("Generos")
            .delete()
            .eq("id_genero", id);

        if (deleteError) {
            console.error(deleteError);
            alert(
                deleteError.message ||
                "No se pudo eliminar el género. Probablemente está referenciado por algún libro."
            );
            setSaving(false);
            return;
        }

        await refetch();
        setSaving(false);
    };

    return (
        <div style={styles.bodyPage}>
            <div style={styles.containerPage}>
                <h1 style={styles.h1Page}>Géneros</h1>

                {loading && <p>Cargando géneros...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                {!loading && !error && (
                    <table id="genreTable" style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Nombre</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {genres.map((g) => (
                                <tr key={g.id_genero}>
                                    <td style={styles.td}>{g.id_genero}</td>
                                    <td style={styles.td}>{g.genero}</td>
                                    <td style={styles.td}>
                                        <button
                                            style={{
                                                ...styles.actionBtnBase,
                                                ...styles.editBtn,
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.editBtnHover
                                                    .backgroundColor!)
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.editBtn
                                                    .backgroundColor!)
                                            }
                                            onClick={() =>
                                                openEditModal(
                                                    g.id_genero,
                                                    g.genero
                                                )
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            style={{
                                                ...styles.actionBtnBase,
                                                ...styles.deleteBtn,
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.deleteBtnHover
                                                    .backgroundColor!)
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.deleteBtn
                                                    .backgroundColor!)
                                            }
                                            onClick={() =>
                                                handleDeleteGenre(g.id_genero)
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

                <div style={styles.buttonGroup}>
                    <button
                        id="addGenreBtn"
                        style={styles.groupButton}
                        onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            styles.groupButtonHover.backgroundColor!)
                        }
                        onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            styles.groupButton.backgroundColor!)
                        }
                        onClick={openCreateModal}
                        disabled={saving}
                    >
                        Agregar Género
                    </button>
                </div>
            </div>

            {/* MODAL CREAR GÉNERO */}
            <Modal show={showCreate} onHide={closeCreateModal} centered>
                <Form onSubmit={handleCreateGenre}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo género</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del género</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. Fantasía, Ciencia Ficción, Historia..."
                                value={newGenre}
                                onChange={(e) => setNewGenre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {formError && (
                            <p style={{ color: "red" }}>{formError}</p>
                        )}
                    </Modal.Body>

                    <Modal.Footer style={{ justifyContent: "space-between" }}>
                        <Button
                            variant="secondary"
                            onClick={closeCreateModal}
                            disabled={saving}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit" variant="success" disabled={saving}>
                            {saving ? (
                                <>
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Guardando...
                                </>
                            ) : (
                                "Guardar género"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* MODAL EDITAR GÉNERO */}
            <Modal show={showEdit} onHide={closeEditModal} centered>
                <Form onSubmit={handleEditGenre}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar género</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del género</Form.Label>
                            <Form.Control
                                type="text"
                                value={editGenre}
                                onChange={(e) =>
                                    setEditGenre(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        {formError && (
                            <p style={{ color: "red" }}>{formError}</p>
                        )}
                    </Modal.Body>

                    <Modal.Footer style={{ justifyContent: "space-between" }}>
                        <Button
                            variant="secondary"
                            onClick={closeEditModal}
                            disabled={saving}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit" variant="success" disabled={saving}>
                            {saving ? (
                                <>
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Guardando cambios...
                                </>
                            ) : (
                                "Guardar cambios"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default Genres;

const styles = {
    bodyPage: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f8",
        padding: 20,
    },
    containerPage: {
        maxWidth: "95%",
        margin: "50px auto",
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    },
    h1Page: {
        textAlign: "center" as const,
        color: "#2D723B",
        marginBottom: 25,
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
        verticalAlign: "middle" as const,
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

    // botón "Agregar Género"
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
        fontWeight: "bold" as const,
        transition: "background-color 0.3s ease",
    },
    groupButtonHover: {
        backgroundColor: "#1A4D29",
    },
};
