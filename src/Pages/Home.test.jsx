import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./Home";

describe("Home Component", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("if homepage is displaying correct information", () => {
    expect(screen.getByText(/login/i)).toBeInTheDocument;
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "THIS IS JUST A TEST"
    );
  });
  test("if homepage has a long paragraph", () => {
    expect(screen.getByText(/learn Cypress/i)).toBeInTheDocument;
  });
});
