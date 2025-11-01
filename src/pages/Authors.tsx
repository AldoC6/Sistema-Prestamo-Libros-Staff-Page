import { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { useAuthors } from "../hooks/useAuthors";
import { supabase } from "../lib/supabase";

const Authors = () => {
    const { authors, loading, error, refetch } = useAuthors();

    // --- estado general de UI ---
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // --- MODAL: CREAR AUTOR ---
    const [showCreate, setShowCreate] = useState(false);
    const [firstNameCreate, setFirstNameCreate] = useState("");
    const [lastNameCreate, setLastNameCreate] = useState("");

    // --- MODAL: EDITAR AUTOR ---
    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [firstNameEdit, setFirstNameEdit] = useState("");
    const [lastNameEdit, setLastNameEdit] = useState("");

    // abrir modal crear
    const openCreateModal = () => {
        setFormError(null);
        setFirstNameCreate("");
        setLastNameCreate("");
        setShowCreate(true);
    };

    // cerrar modal crear
    const closeCreateModal = () => {
        if (!saving) {
            setShowCreate(false);
            setFirstNameCreate("");
            setLastNameCreate("");
        }
    };

    // submit crear autor
    const handleCreateAuthor = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstNameCreate.trim() || !lastNameCreate.trim()) {
            setFormError("Por favor llena nombre y apellido.");
            return;
        }

        setSaving(true);
        setFormError(null);

        const { error: insertError } = await supabase
            .from("Autores")
            .insert([
                {
                    first_name: firstNameCreate.trim(),
                    last_name: lastNameCreate.trim(),
                },
            ]);

        if (insertError) {
            console.error(insertError);
            setFormError(
                insertError.message || "No se pudo guardar el autor."
            );
            setSaving(false);
            return;
        }

        await refetch();

        setSaving(false);
        setShowCreate(false);
        setFirstNameCreate("");
        setLastNameCreate("");
    };

    // abrir modal editar
    const openEditModal = (id: number, fName: string, lName: string) => {
        setEditId(id);
        setFirstNameEdit(fName);
        setLastNameEdit(lName);
        setFormError(null);
        setShowEdit(true);
    };

    // cerrar modal editar
    const closeEditModal = () => {
        if (!saving) {
            setShowEdit(false);
            setEditId(null);
            setFirstNameEdit("");
            setLastNameEdit("");
        }
    };

    // submit editar autor
    const handleEditAuthor = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editId) return; // seguridad

        if (!firstNameEdit.trim() || !lastNameEdit.trim()) {
            setFormError("Por favor llena nombre y apellido.");
            return;
        }

        setSaving(true);
        setFormError(null);

        const { error: updateError } = await supabase
            .from("Autores")
            .update({
                first_name: firstNameEdit.trim(),
                last_name: lastNameEdit.trim(),
            })
            .eq("id_autor", editId);

        if (updateError) {
            console.error(updateError);
            setFormError(
                updateError.message || "No se pudo actualizar el autor."
            );
            setSaving(false);
            return;
        }

        await refetch();

        setSaving(false);
        setShowEdit(false);
        setEditId(null);
        setFirstNameEdit("");
        setLastNameEdit("");
    };

    // eliminar autor
    const handleDeleteAuthor = async (id: number) => {
        const ok = window.confirm(
            "¿Seguro que quieres eliminar este autor? Esta acción no se puede deshacer."
        );
        if (!ok) return;

        setSaving(true);
        setFormError(null);

        const { error: deleteError } = await supabase
            .from("Autores")
            .delete()
            .eq("id_autor", id);

        if (deleteError) {
            console.error(deleteError);
            alert(
                deleteError.message ||
                "No se pudo eliminar el autor (puede estar referenciado en un libro)."
            );
            setSaving(false);
            return;
        }

        await refetch();
        setSaving(false);
    };

    return (
        <div style={styles.bodyUsers}>
            <div style={styles.containerUsers}>
                <h1 style={styles.h1Users}>Gestionar Autores</h1>
                <div style={styles.buttonGroup}>
                    <button
                        id="addBtn"
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
                        Agregar Autor
                    </button>
                </div>

                {loading && <p>Cargando autores...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                {!loading && !error && (
                    <table id="authorsTable" style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Nombre</th>
                                <th style={styles.th}>Apellido</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((a) => (
                                <tr key={a.id_autor}>
                                    <td style={styles.td}>{a.id_autor}</td>
                                    <td style={styles.td}>{a.first_name}</td>
                                    <td style={styles.td}>{a.last_name}</td>
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
                                                    a.id_autor,
                                                    a.first_name,
                                                    a.last_name
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
                                                handleDeleteAuthor(a.id_autor)
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

            {/* MODAL CREAR AUTOR */}
            <Modal show={showCreate} onHide={closeCreateModal} centered>
                <Form onSubmit={handleCreateAuthor}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo autor</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. Gabriel"
                                value={firstNameCreate}
                                onChange={(e) =>
                                    setFirstNameCreate(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej. García Márquez"
                                value={lastNameCreate}
                                onChange={(e) =>
                                    setLastNameCreate(e.target.value)
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
                            onClick={closeCreateModal}
                            disabled={saving}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            variant="success"
                            disabled={saving}
                        >
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
                                "Guardar autor"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* MODAL EDITAR AUTOR */}
            <Modal show={showEdit} onHide={closeEditModal} centered>
                <Form onSubmit={handleEditAuthor}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar autor</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstNameEdit}
                                onChange={(e) =>
                                    setFirstNameEdit(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastNameEdit}
                                onChange={(e) =>
                                    setLastNameEdit(e.target.value)
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

                        <Button
                            type="submit"
                            variant="success"
                            disabled={saving}
                        >
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
        fontWeight: "bold" as const,
        transition: "background-color 0.3s ease",
    },
    groupButtonHover: {
        backgroundColor: "#1A4D29",
    },
};
