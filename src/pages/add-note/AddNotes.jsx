import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../add-note/AddNotes.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AddNotes = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState({
    title: "",
    body: "",
    id: `notes-${+new Date()}`,
    isArchive: false,
    date: new Date().toISOString(),
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoteText((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log(noteText);
    setNoteText({ title: "", body: "" });
    handleAddNote(noteText);
    navigate("/");

    // if (noteText.trim().length > 0) {
    //   handleAddNote(noteText);
    //   setNoteText("");
    // }
  };
  return (
    <div className="container">
      <br />
      <div className="form">
        <Card className="text-center">
          <Card.Header>ADD NOTE</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSaveClick}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  type="text"
                  placeholder="Judul . . ."
                  name="title"
                  value={noteText.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Deskripsi . . ."
                  name="body"
                  value={noteText.body}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">@Achmad Fadli</Card.Footer>
        </Card>
      </div>
    </div>
  );
};

AddNotes.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
};

export default AddNotes;
