import { useCallback, useContext, useEffect, useState } from "react";
import CardNote from "../../components/CardNote";
import FabButton from "../../components/FabButton";
import FormNote from "./FormNote";
import Modal from "../../components/Modal";
import { NotesService } from "../../services/notes/note-service";
import { Button, Container } from "./styles";
import { Context } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useQuery } from "react-query";
import { formatDate } from "../../services/utils";

function Home() {
  const navigate = useNavigate();
  const { handleLogout, authenticated } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    if (!authenticated) navigate("/");
  }, [authenticated]);

  const deleteNote = useCallback((id: number) => { }, []);


  const { data, isLoading, isError, dataUpdatedAt, isPreviousData } = useQuery({
    queryKey: ["notes", page, pageSize],
    queryFn: () => NotesService.getNotesPaginated(page, pageSize),
    // keepPreviousData: true
  });

  if (isError) {
    return (
      <Container>
        <h1 style={{ color: "yellow" }}>Erro ao carregar notas</h1>
      </Container>
    );
  }

  return (
    <>
      {isLoading  && <Loading />}
      {showModal && (
        <Modal
          title="Nova nota"
          handleClose={() => setShowModal(false)}
          style={{ width: "100px" }}
        >
          <FormNote handleSubmit={() => {}} />
        </Modal>
      )}
      <Container>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>{"<"}</Button>
        <div style={{ width: 1000, display: "flex", gap: 16 }}>
          {data?.data.notes.map((note) => (
            <CardNote key={note.id} handleDelete={deleteNote} note={note}></CardNote>
          ))}
        </div>
        <Button onClick={() => setPage(page + 1)} disabled={page === data?.data.totalPages}>{">"}</Button>
        <FabButton position="left" handleClick={() => setShowModal(true)}>
          +
        </FabButton>
        <FabButton position="right" handleClick={handleLogout}>
          <span className="material-icons">logout</span>
        </FabButton>
      </Container>
      {formatDate(new Date(dataUpdatedAt))}
    </>
  );
}

export default Home;
