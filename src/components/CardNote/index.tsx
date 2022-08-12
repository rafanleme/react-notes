import { HTMLAttributeAnchorTarget, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../services/utils";
import { ApplicationState } from "../../store";
import { deleteNoteRequest } from "../../store/ducks/notes/notes.actions";
import { Note } from "../../store/ducks/notes/notes.types";
import { Container } from "./styles";

interface NoteProps {
  note: Note;
}

function CardNote({ note }: NoteProps) {
  const dispatch = useDispatch();

  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoadingDeleteNote, deleteNoteId } = useSelector(
    (state: ApplicationState) => state.noteState
  );

  const handleDelete = (noteId: number) => {
    dispatch(deleteNoteRequest(noteId));
  };

  if (deleteNoteId === note.id && containerRef?.current)
    containerRef.current.style.opacity = "0.5";

  return (
    <>
      <Container ref={containerRef}>
        <p>{formatDate(new Date(note?.date))}</p>
        <p>{note.text}</p>
        {note.urgent && (
          <span className="material-icons" id="priority">
            priority_high
          </span>
        )}
        {isLoadingDeleteNote && deleteNoteId === note.id ? (
          <span className="material-icons spin">cached</span>
        ) : (
          <span
            className="material-icons"
            onClick={() => handleDelete(note.id)}
          >
            delete_forever
          </span>
        )}
      </Container>
    </>
  );
}

export default CardNote;
