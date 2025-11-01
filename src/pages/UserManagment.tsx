import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { supabase } from '../lib/supabase';
import { useStaff } from '../hooks/useStaff';
import { useRoles } from '../hooks/useRoles';

const UserManagment = () => {
    const { staff, loading, error, reload } = useStaff();
    const { roles, loading: loadingRoles } = useRoles();

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    // estados del formulario
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState<string>(""); // <- ya no default fijo


    const handleClose = () => setShow(false);
    const handleShow = () => {
        // limpiar cada que abrimos
        setFirstName("");
        setLastName("");
        setEmail("");
        setMatricula("");
        setPassword("");
        setRoleId(roles.length > 0 ? String(roles[0].id_role) : "");
        setValidated(false);
        setShow(true);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        // Aquí creamos el usuario en auth con metadata que tu trigger espera
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            user_metadata: {
                first_name: firstName,
                last_name: lastName,
                matricula: matricula,
                role_id: roleId,
            }
        });

        if (error) {
            console.error("Error creando usuario:", error);
            alert("No se pudo crear el usuario: " + error.message);
            return;
        }

        console.log("Usuario creado:", data);

        // tu trigger ya debió insertar en "Usuarios"
        await reload();
        handleClose();
    }

    return (
        <div style={styles.bodyUsers}>
            <div style={styles.containerUsers}>
                <h1 style={styles.h1Users}>Gestionar usuarios</h1>

                <div style={styles.buttonGroup}>
                    <Button variant="primary" onClick={handleShow} style={styles.groupButton}>
                        Agregar Usuario
                    </Button>
                </div>

                {loading && <p>Cargando usuarios...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                {!loading && !error && (
                    <table id="userTable" style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Nombre</th>
                                <th style={styles.th}>Apellido</th>
                                <th style={styles.th}>Correo</th>
                                <th style={styles.th}>Matricula</th>
                                <th style={styles.th}>Rol</th>
                                <th style={styles.th}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map(u => (
                                <tr key={u.id_user}>
                                    <td style={styles.td}>{u.id_user}</td>
                                    <td style={styles.td}>{u.first_name}</td>
                                    <td style={styles.td}>{u.last_name}</td>
                                    <td style={styles.td}>{u.email}</td>
                                    <td style={styles.td}>{u.matricula}</td>
                                    <td style={styles.td}>{u.Roles?.role ?? u.role_id}</td>
                                    <td style={styles.td}>
                                        <button
                                            style={{ ...styles.actionBtnBase, ...styles.revokeBtn }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.revokeBtnHover.backgroundColor!)
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                styles.revokeBtn.backgroundColor!)
                                            }
                                            onClick={() => {
                                                alert("TODO: Revocar acceso para " + u.email);
                                            }}
                                        >
                                            Revocar acceso
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* MODAL */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nuevo Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nombre"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingresa el nombre
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="apellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Apellido"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingresa el apellido
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="correo">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresa un correo válido
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="matricula">
                            <Form.Label>Matrícula</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Matricula"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Campo obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="role_id">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                                required
                                disabled={loadingRoles}
                                value={roleId}
                                onChange={(e) => setRoleId(e.target.value)}
                            >
                                {loadingRoles && (
                                    <option value="">Cargando roles...</option>
                                )}

                                {!loadingRoles && roles.length === 0 && (
                                    <option value="">No hay roles definidos</option>
                                )}

                                {!loadingRoles && roles.map((rol) => (
                                    <option
                                        key={rol.id_role}
                                        value={rol.id_role}
                                    >
                                        {rol.role}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Selecciona un rol
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresa una contraseña
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" style={styles.groupButton}>
                            Agregar Staff
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserManagment;


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
        color: "#333333",
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

    // botones de acción por fila (revocar acceso, etc.)
    actionBtnBase: {
        padding: "8px 12px",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
    },
    revokeBtn: {
        backgroundColor: "#CC444B",
        color: "#fff",
    },
    revokeBtnHover: {
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
        color: "#fff",
        fontSize: 15,
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        fontWeight: "bold",
    },
    groupButtonHover: {
        backgroundColor: "#1A4D29",
    },
};