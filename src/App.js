import { Route, Routes } from "react-router-dom";
import NavbarComp from "./components/Navbar/NavbarComp";
import AddNotes from "./pages/add-note/AddNotes";
import Notes from "./pages/Notes";
import NotesDetail from "./pages/NotesDetail";
import { useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { getUserLogged, putAccessToken } from "./utils/api";

function App() {
  const [notes, setNotes] = useState([
    {
      id: "notes-1",
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      date: "2022-04-14T04:27:34.572Z",
      isArchive: false,
    },
    {
      id: "notes-2",
      title: "Functional Component",
      body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
      date: "2022-04-14T04:27:34.572Z",
      isArchive: false,
    },
    {
      id: "notes-3",
      title: "Modularization",
      body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
      date: "2022-04-14T04:27:34.572Z",
      isArchive: false,
    },
    {
      id: "notes-4",
      title: "Lifecycle",
      body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
      date: "2022-04-14T04:27:34.572Z",
      isArchive: false,
    },
    {
      id: "notes-5",
      title: "ESM",
      body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
      date: "2022-04-14T04:27:34.572Z",
      isArchive: false,
    },
  ]);

  const addNote = (noteText) => {
    const newNotes = [...notes, noteText];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const { data } = getUserLogged();
    setAuthedUser(data);
    setInitializing(false);
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
        <Route path="/add" element={<AddNotes handleAddNote={addNote} />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
