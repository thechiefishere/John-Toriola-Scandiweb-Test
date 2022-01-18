import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
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

  test("that currencyTab toggles", () => {
    expect(screen.getByTestId("arrowDown")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("arrowDown"));
    expect(screen.getByTestId("arrowUp")).toBeInTheDocument();
  });
});
