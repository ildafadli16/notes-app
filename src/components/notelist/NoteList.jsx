import React from "react";
import Note from "../note/Note";
import "../notelist/NoteList.css";
import PropTypes from "prop-types";

const NoteList = ({ notes, handleDeleteNote }) => {
  return (
    <div className="note-list">
      {notes?.length ? (
        notes.map((note) => (
          <Note
            note={note}
            key={note.id}
            body={note.body}
            date={note.date}
            title={note.title}
            isArchive={note.isArchive}
            handleDeleteNote={handleDeleteNote}
          />
        ))
      ) : (
        <p>belum ada catatan</p>
      )}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};

export default NoteList;
