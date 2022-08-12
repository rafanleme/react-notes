import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FormNote from ".";

describe("FormNote Component", () => {
  it("should to render a card note urgent", () => {
    const handleSubmit = () => {};

    const { getByText } = render(<FormNote handleSubmit={handleSubmit} />);

    expect(getByText("Salvar")).toBeInTheDocument();
  });

  it("should to click in save button", async () => {
    const action = {
      handleSubmit() {},
    };
    const spy = jest.spyOn(action, "handleSubmit");

    const { debug, getByText } = render(
      <FormNote handleSubmit={action.handleSubmit} />
    );

    const button = getByText("Salvar");

    userEvent.click(button);

    await waitFor(() => {
      expect(spy).toBeCalled();
    });
  });
});
