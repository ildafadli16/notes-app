import { Route, Routes } from "react-router-dom";
import NavbarComp from "./components/Navbar/NavbarComp";
import AddNotes from "./pages/add-note/AddNotes";
import Notes from "./pages/Notes";
import NotesDetail from "./pages/NotesDetail";
import { useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { addNote, getNotes, getUserLogged, putAccessToken } from "./utils/api";

function App() {
  const [notes, setNotes] = useState([]);

  // const onAddNoteHandler = (noteText) => {
  //   const newNotes = [...notes, noteText];
  //   setNotes(newNotes);
  //   console.log(notes);
  // };

  async function onAddNoteHandler(noteText) {
    await addNote(noteText);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    const fetchGetNotes = async () => {
      const { error, data } = await getNotes();
      if (!error) {
        setNotes(data);
      }
    };

    fetchGetNotes();
  }, []);

  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchGetUserLogged = async () => {
      const { error, data } = await getUserLogged();
      if (error) {
        setInitializing(false);
      } else {
        setAuthedUser(data);
        setInitializing(false);
      }
    };

    fetchGetUserLogged();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken("");
  }

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <Routes>
        <Route path="/*" element={<Login loginSuccess={onLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
  return (
    <div className="App">
      <NavbarComp onLogout={onLogout} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Notes notesItem={notes} handleDeleteNote={deleteNote} />}
        />
        <Route path="/:id" element={<NotesDetail notes={notes} />} />
        <Route
          path="/add"
          element={<AddNotes handleAddNote={onAddNoteHandler} />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
