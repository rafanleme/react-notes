import { useCallback, useContext, useEffect, useState } from "react";
import CardNote from "../../components/CardNote";
import FabButton from "../../components/FabButton";
import FormNote, { FormValueState } from "./FormNote";
import Modal from "../../components/Modal";
import { NotesService, PaginatedNotes } from "../../services/notes/note-service";
import { Button, Container } from "./styles";
import { Context } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const initialData: Partial<PaginatedNotes> = {
  notes: []
}

function Home() {
  const { handleLogout, authenticated } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState<Partial<PaginatedNotes>>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await NotesService.getNotesPaginated(page, pageSize);

      setData(data);
      setIsLoading(false);
    })();
  }, [page, pageSize]);


  useEffect(() => {
    if (!authenticated) navigate("/");
  }, [authenticated]);

  const deleteNote = useCallback((id: number) => {
    // (async () => {
    //   await NotesService.deleteNote(id);

    //   setNotes((prevState) => prevState.filter((note) => note.id !== id));
    // })();
  }, []);

  // const queryClient = useQueryClient()

  // const mutationCreate = useMutation(NotesService.postNotes, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("notes");
  //     setShowModal(false);
  //   },
  // });

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
          {/* <FormNote handleSubmit={mutationCreate.mutate} /> */}
        </Modal>
      )}
      <Container>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>{"<"}</Button>
        <div style={{ width: 1000, display: "flex", gap: 16 }}>
          {data?.notes?.map((note) => (
            <CardNote key={note.id} handleDelete={deleteNote} note={note}></CardNote>
          ))}
        </div>
        <Button onClick={() => setPage(page + 1)} disabled={page === data?.totalPages}>{">"}</Button>
        <FabButton position="left" handleClick={() => setShowModal(true)}>
          +
        </FabButton>
        <FabButton position="right" handleClick={handleLogout}>
          <span className="material-icons">logout</span>
        </FabButton>
      </Container>
    </>
  );
}

export default Home;
