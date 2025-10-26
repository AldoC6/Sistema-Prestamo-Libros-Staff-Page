import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const UserManagment = () => {
    const [show, setShow] = useState(false);

    const [validated, setValidated] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget
        event.preventDefault()
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            // TODO GUARDAR STAFF
            console.log("Formulario válido, enviando datos...")
            handleClose()
        }
        setValidated(true)
    }

    return (
        <div style={styles.bodyUsers}>
            <div style={styles.containerUsers}>
                <h1 style={styles.h1Users}>Gestionar usuarios</h1>

                <div style={styles.searchContainer}>
                    <label style={styles.searchLabel} htmlFor="searchInput">
                        Buscar:
                    </label>

                    <input
                        style={styles.searchInput}
                        type="text"
                        id="searchInput"
                        placeholder="Buscar por ID o nombre..."
                    />
                </div>
                <div style={styles.buttonGroup}>
                    <Button variant="primary" onClick={handleShow} style={styles.groupButton}>
                        Agregar Nuevo Staff
                    </Button>

                </div>

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
                        {/* Ejemplo de fila con botón de revocar */}
                        {/* <tr>
              <td style={styles.td}>14</td>
              <td style={styles.td}>Aldo</td>
              <td style={styles.td}>Cavazos</td>
              <td style={styles.td}>acavazos@fime.uanl.mx</td>
              <td style={styles.td}>2048374</td>
              <td style={styles.td}>Admin</td>
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
                >
                  Revocar acceso
                </button>
              </td>
            </tr> */}
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nuevo Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control required type="text" placeholder="Nombre" />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingresa el nombre
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="apellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control required type="text" placeholder="Apellido" />
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
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresa un correo válido
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="matricula">
                            <Form.Label>Matrícula</Form.Label>
                            <Form.Control required type="text" placeholder="Matricula" />
                            <Form.Control.Feedback type="invalid">
                                Campo obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control required type="password" placeholder="Contraseña" />
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