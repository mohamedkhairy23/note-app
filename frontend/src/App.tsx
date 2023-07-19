import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInModal from "./componets/LogInModal";
import NavBar from "./componets/NavBar";
import SignUpModal from "./componets/SignUpModal";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import { NotFoundPage } from "./pages/NotFoundPage";
import NotesPage from "./pages/NotesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <>
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
      </BrowserRouter>{" "}
      <ToastContainer />
    </>
  );
}

export default App;
