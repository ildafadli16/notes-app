import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../add-note/AddNotes.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../utils/api";

const Login = ({ loginSuccess }) => {
  const [noteText, setNoteText] = useState({
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

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log(noteText);
    setNoteText({ email: "", password: "" });
    onLogin(noteText);
  };

  return (
    <div>
      <div className="container">
        <br />
        <div className="form">
          <Card className="text-center">
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSaveClick}>
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
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
              <p>
                Belum punya akun? <Link to="/register">Daftar di sini.</Link>
              </p>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
