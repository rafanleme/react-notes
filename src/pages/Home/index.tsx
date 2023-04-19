import { useState } from "react";
import CardNote from "../../components/CardNote";
import FabButton from "../../components/FabButton";
import FormNote from "./FormNote";
import Modal from "../../components/Modal";
import { NotesService } from "../../services/notes/note-service";
import { Container } from "./styles";
import Loading from "../../components/Loading";
import { useMutation, useQuery, useQueryClient } from "react-query";

function Home() {
  const [showModal, setShowModal] = useState(false);

  const { data: notes, isLoading, isError } = useQuery(
    "notes",
    NotesService.getNotes,
    {
      refetchOnWindowFocus: false
    }
  );

  const queryClient = useQueryClient();

  if (isError) {
    return (
      <h1>Erro ao carregar notas</h1>
    );
  }

  const mutationCreate = useMutation(NotesService.postNotes, {
    onMutate: (newNote) => {
      queryClient.cancelQueries('notes');
    },
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      setShowModal(false);
    },
    onError: (_, __, context: any) => {
      if (context?.previousComments) {
        queryClient.setQueryData('notes', context.previousComments);
      }
    },
    onSettled: () => {
      // success or error
    }
  });

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
        {notes?.map((note) => (
          <CardNote key={note.id} note={note}></CardNote>
        ))}
      </Container>
      <FabButton position="left" handleClick={() => setShowModal(true)}>
        +
      </FabButton>
    </>
  );
}

export default Home;
