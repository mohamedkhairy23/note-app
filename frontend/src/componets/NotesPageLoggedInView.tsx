import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import {
  default as AddEditNoteDialog,
  default as AddNoteDialog,
} from "../componets/AddEditNoteDialog";
import Note from "../componets/Note";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import { toast } from "react-toastify";

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setNotesLoading(false);
      }
    };
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
      toast.success("Note Deleted Successfully");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            className={styles.note}
            onDeleteNoteClicked={deleteNote}
            onNoteClicked={setNoteToEdit}
          />
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>{" "}
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {error && <p>Something went wrong. Please refresh the page</p>}
      {!error && !notesLoading && (
        <>
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}
        </>
      )}
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
