import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardNote from ".";

describe("CardNote Component", () => {
  it("should to render a card note urgent", () => {
    const note = {
      id: 1,
      text: "Texto qualquer",
      date: new Date(),
      urgent: true,
    };

    const { getByText } = render(<CardNote note={note} />);

    expect(getByText("Texto qualquer")).toBeInTheDocument();
    expect(getByText("priority_high")).toBeInTheDocument();
    expect(getByText("delete_forever")).toBeInTheDocument();
  });

  it("should to render a card note not urgent", () => {
    const note = {
      id: 1,
      text: "Texto qualquer",
      date: new Date(),
    };

    const { getByText, queryByText } = render(<CardNote note={note} />);

    expect(getByText("Texto qualquer")).toBeInTheDocument();
    expect(queryByText("priority_high")).not.toBeInTheDocument();
  });
});
