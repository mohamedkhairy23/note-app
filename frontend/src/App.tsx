import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const res = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await res.json();
        setNotes(notes);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    };
    loadNotes();
  }, []);

  return <div className="App">{JSON.stringify(notes)}</div>;
}

export default App;
