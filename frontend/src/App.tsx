import { Container } from "react-bootstrap";
import LogInModal from "./componets/LogInModal";
import NavBar from "./componets/NavBar";
import SignUpModal from "./componets/SignUpModal";
import styles from "./styles/NotesPage.module.css";
import { useState, useEffect } from "react";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from "./componets/NotesPageLoggedInView";
import NotesPageLoggedOutVew from "./componets/NotesPageLoggedOutVew";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogInClicked={() => setShowLoginModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className="my-3">
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginModal && (
          <LogInModal
            onDismiss={() => setShowLoginModal(false)}
            onLogInSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
