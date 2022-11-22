import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Note = ({ note, notes, handleDeleteNote }) => {
  const { id, title, date, body } = note;
  return (
    <div>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Header>{date}</Card.Header>
        <Card.Body>
          <Card.Title>
            <Link to={`/${id}`}>{title}</Link>
          </Card.Title>
          <Card.Text>
            {" "}
            {body.length <= 25 ? body : `${body.slice(0, 25)}... `}
            <span className="font-bold"></span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteNote(id);
            }}
          >
            Hapus
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};

export default Note;
