import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/NewNote";
import { useLocalStorage } from "./utils/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteList";
import NoteLayout from "./components/NoteLayout";
import Note from "./components/Note";
import EditNote from "./components/EditNote";

export type Tag = {
  id: string;
  label: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Note = {
  id: string;
} & NoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else return note;
      });
    });
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const onDeleteNote = (id: string) => {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notesWithTags} availiableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availiableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availiableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
