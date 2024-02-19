import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availiableTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availiableTags }: EditNoteProps) => {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availiableTags={availiableTags}
      />
    </>
  );
};

export default EditNote;
