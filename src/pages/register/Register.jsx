import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../add-note/AddNotes.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../utils/api";

const Register = () => {
  const [noteText, setNoteText] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoteText((prev) => {
      return { ...prev, [name]: value };
    });
  };

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }
  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log(noteText);
    setNoteText({ name: "", email: "", password: "" });
    onRegisterHandler(noteText);
  };

  return (
    <div>
      <div className="container">
        <br />
        <div className="form">
          <Card className="text-center">
            <Card.Header>Register</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSaveClick}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Nama"
                    name="name"
                    value={noteText.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={noteText.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={noteText.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
              <p>
                Kembali ke <Link to="/">Masuk</Link>
              </p>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
