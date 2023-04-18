import { useCallback, useContext, useEffect, useState } from "react";
import CardNote from "../../components/CardNote";
import FabButton from "../../components/FabButton";
import FormNote, { FormValueState } from "./FormNote";
import Modal from "../../components/Modal";
import { NotesService } from "../../services/notes/note-service";
import { Button, Container } from "./styles";
import { Context } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { formatDate } from "../../services/utils";

function Home() {
  const { handleLogout, authenticated } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError, dataUpdatedAt } = useQuery({
    queryKey:["notes", page, pageSize],
    queryFn: () => NotesService.getNotesPaginated(page, pageSize),
    keepPreviousData: true
  });

  useEffect(() => {
    if (!authenticated) navigate("/");
  }, [authenticated]);

  const deleteNote = useCallback((id: number) => {
    // (async () => {
    //   await NotesService.deleteNote(id);

    //   setNotes((prevState) => prevState.filter((note) => note.id !== id));
    // })();
  }, []);

  const queryClient = useQueryClient()

  const mutationCreate = useMutation(NotesService.postNotes, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      setShowModal(false);
    },
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
      {isLoading && <Loading />}
      {showModal && (
        <Modal
          title="Nova nota"
          handleClose={() => setShowModal(false)}
          style={{ width: "100px" }}
        >
          <FormNote handleSubmit={mutationCreate.mutate} />
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
