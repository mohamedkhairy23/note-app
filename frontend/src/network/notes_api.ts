import { Note } from "../models/note";
import { User } from "../models/user";
import { UnAuthorizedError, ConflictError } from "../errors/httpErrors";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnAuthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(errorMessage);
    }
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch("/api/notes", {
    method: "GET",
  });
  return res.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const res = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return res.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`/api/notes/${noteId}`, { method: "DELETE" });
}

export async function getLoggedInUser(): Promise<User> {
  const res = await fetchData("/api/users", { method: "GET" });
  return res.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const res = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export interface LoggedInCredentials {
  username: string;
  password: string;
}

export async function logIn(credentials: LoggedInCredentials): Promise<User> {
  const res = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function logout() {
  await fetchData("/api/users/logout", { method: "POST" });
}
