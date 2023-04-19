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
import { Note } from "../../services/notes/types";
import { useQuery } from "react-query";

function Home() {
  const { data: notes, isLoading, isError }
    = useQuery("notes", NotesService.getNotes);

  if (isError) {
    return (
      <h1>Erro ao carregar notas</h1>
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      {notes?.map((note) => (
        <CardNote key={note.id} note={note}></CardNote>
      ))}
    </>
  );
}

export default Home;
