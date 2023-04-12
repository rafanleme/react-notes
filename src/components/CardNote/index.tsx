import { useNavigate } from "react-router-dom";
import { Note } from "../../services/notes/types";
import { formatDate } from "../../services/utils";
import { Container } from "./styles";

interface NoteProps {
  note: Note;
  handleDelete: (id: number) => void;
}

function CardNote({ note, handleDelete }: NoteProps) {

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <p>{formatDate(new Date(note?.date))}</p>
        <p>{note.text}</p>
        {note.urgent && (
          <span className="material-icons" id="priority">
            priority_high
          </span>
        )}
        <span className="material-icons" id="priority" onClick={() => navigate("/details")}>
          {" "}
          info{" "}
        </span>
        <span className="material-icons" onClick={() => handleDelete(note.id)}>
          {" "}
          delete_forever{" "}
        </span>
      </Container>
    </>
  );
}

export default CardNote;
