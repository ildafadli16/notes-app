import NoteList from "../components/notelist/NoteList";
import PropTypes from "prop-types";

const Notes = ({ notesItem, handleDeleteNote }) => {
  return (
    <div>
      <NoteList notes={notesItem} handleDeleteNote={handleDeleteNote} />
    </div>
  );
};
Notes.propTypes = {
  notesItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};
export default Notes;
