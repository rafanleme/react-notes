import { FormValueState } from "../../pages/Home/FormNote";
import { api } from "../api";
import { Note } from "./types";

interface PaginatedNotes {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  notes: Note[]
}

export const NotesService = {
  getNotes: () => api.get<Note[]>("/notes"),
  getNotesPaginated: (page: number, pageSize: number) => api.get<PaginatedNotes>("/notes:paginated", {
    params: {
      page,
      pageSize
    }
  }),
  postNotes: (payload: FormValueState) => api.post<Note>("/notes", payload),
  deleteNote: (payload: { id: number }) => api.delete(`/notes/${payload.id}`),
};
