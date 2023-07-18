import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../componets/NotesPageLoggedInView";
import NotesPageLoggedOutVew from "../componets/NotesPageLoggedOutVew";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface NotesPageProps {
  loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={`${styles.notesPage}`}>
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutVew />}
      </>
    </Container>
  );
};

export default NotesPage;
