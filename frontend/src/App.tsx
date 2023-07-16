import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./componets/Note";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./componets/AddNoteDialog";
import styleUtils from "./styles/utils.module.css";
function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    };
    loadNotes();
  }, []);

  return (
    <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="justify-content-md-center g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
