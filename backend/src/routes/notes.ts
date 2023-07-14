import express from "express";
const router = express.Router();
import * as NotesController from "../controllers/notes";

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNote);

router.post("/", NotesController.createNote);

export default router;
