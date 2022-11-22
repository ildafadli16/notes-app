import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const NotesDetail = ({ notes }) => {
  const { id } = useParams();
  const note = notes.find((note) => note.id.toString() === id);
  const { title, body } = note || {};

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ color: "red" }}>{title}</h1>
      <br />
      <p>{body}</p>
    </div>
  );
};

NotesDetail.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default NotesDetail;
