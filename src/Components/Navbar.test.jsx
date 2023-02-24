import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../Store/Store";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders LOGIN when isLoginCorrect is false", () => {
    const mockAuthContext = {
      isLoginCorrect: false,
    };

    jest.spyOn(React, "useContext").mockImplementation((context) => {
      if (context === AuthContext) {
        return mockAuthContext;
      }
    });

    render(<Navbar />);

    const loginButton = screen.getByText("LOGIN");
    expect(loginButton).toBeInTheDocument();
  });

  test("renders LOGOUT when isLoginCorrect is true", () => {
    const mockAuthContext = {
      isLoginCorrect: true,
    };

    jest.spyOn(React, "useContext").mockImplementation((context) => {
      if (context === AuthContext) {
        return mockAuthContext;
      }
    });

    render(<Navbar />);

    const logoutButton = screen.getByText("LOGOUT");
    expect(logoutButton).toBeInTheDocument();
  });
});
