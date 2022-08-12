import {
  queryByText,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";
import "@testing-library/jest-dom";
import * as NotesService from "../../services/notes/note-service";
import { Note } from "../../services/notes/types";
import Home from ".";

jest.mock("../../services/notes/note-service");

describe("Home Component", () => {
  beforeAll(() => {
    const mock = jest.spyOn(NotesService, "getNotes");

    mock.mockImplementation(() => {
      return Promise.resolve({
        data: [
          { id: 1, text: "Nota de exemplo", date: new Date() },
          { id: 2, text: "Nota urgente", date: new Date(), urgent: true },
        ],
      } as AxiosResponse<Note[]>);
    });
  });

  it("should to render Home Component", async () => {
    const HomeRender = render(<Home />);

    await waitFor(() => {
      expect(HomeRender).toBeTruthy();
      expect(HomeRender.getByText("+")).toBeInTheDocument();
    });
  });

  it("should to list notes", async () => {
    const { getByText, getAllByTestId } = render(<Home />);

    await waitFor(async () => {
      const cards = getAllByTestId("card-note");

      expect(cards[0]).toBeInTheDocument();
      expect(cards[0]).toContainElement(getByText("Nota de exemplo"));
      expect(cards[0]).not.toContainElement(getByText("priority_high"));

      expect(cards[1]).toBeInTheDocument();
      expect(cards[1]).toContainElement(getByText("priority_high"));
    });
  });

  it("should to list notes (using findBy)", async () => {
    const { findByText, findAllByTestId } = render(<Home />);

    const cards = await findAllByTestId("card-note");

    expect(cards[0]).toBeInTheDocument();
    expect(cards[0]).toContainElement(await findByText("Nota de exemplo"));
    expect(cards[0]).not.toContainElement(await findByText("priority_high"));

    expect(cards[1]).toBeInTheDocument();
    expect(cards[1]).toContainElement(await findByText("priority_high"));
  });
});
