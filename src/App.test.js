import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "./App";

describe("what happens in <App />", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("that 'Category name' is on the page", () => {
    expect(
      screen.getByRole("heading", { name: /category name/i })
    ).toBeInTheDocument();
  });
});
