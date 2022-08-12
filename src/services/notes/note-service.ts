import { api } from "../api";
import { Note } from "./types";

export const getNotes = () => api.get<Note[]>("/notes");
