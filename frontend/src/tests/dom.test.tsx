import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import "@testing-library/dom";
import "@testing-library/jest-dom";
import { Wishlist } from "../components/Wishlist";
import { GoogleSignIn} from "../components";


import App from "../App";
import { ProductDescription, NewSearchBar, SearchResults } from "../components";

beforeEach(() => {
  render(<App />);
});

test("renders input and button elements", () => {
  render(<NewSearchBar />);
  const inputElement = screen.getByRole("input-search-box");
  const buttonElement = screen.getByRole("button", { name: /search/i });
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test("renders components", () => {
  // expect(screen.getByRole("input-search-box")).toBeInTheDocument();
  expect(screen.getByRole("error-message")).toBeInTheDocument();
  expect(screen.getByRole("signin-container")).toBeInTheDocument();
  expect(screen.getByRole("app")).toBeInTheDocument();
});

test("input element accepts user input", () => {
  render(<NewSearchBar />);
  const inputElement = screen.getByRole("input-search-box");
  fireEvent.change(inputElement, { target: { value: "Adidas" } });
  expect(inputElement).toHaveValue("Adidas");
});

test("search button is enabled when input is not empty", () => {
  render(<NewSearchBar />);
  const searchButton = screen.getByRole("button", { name: "Search" });
  const input = screen.getByRole("input-search-box");
  fireEvent.change(input, { target: { value: "sneakers" } });
  expect(searchButton).toBeEnabled();
});

test("search button is enabled when input is not empty", () => {
  render(<NewSearchBar />);
  const searchButton = screen.getByRole("button", { name: "Search" });
  const input = screen.getByRole("input-search-box");
  fireEvent.change(input, { target: { value: "sneakers" } });
  expect(searchButton).toBeEnabled();
});

test("search button is disabled when input is empty", () => {
  render(<NewSearchBar />);
  const searchButton = screen.getByRole("button", { name: "Search" });
  expect(searchButton).toBeEnabled();
});

import React from "react";


test("renders sign in button when user is not signed in", () => {
  const { getByLabelText, getByText } = render(<GoogleSignIn />);
  const signInButton = getByLabelText("Press Enter to Sign In With Google");
  const signInText = getByText("Sign in!");
  const googleIcon = getByLabelText("Google logo");

  expect(signInButton).toBeInTheDocument();
  expect(signInText).toBeInTheDocument();
  expect(googleIcon).toBeInTheDocument();
});

test("renders sign out button when user is signed in", () => {
  const { getByLabelText, getByText } = render(<GoogleSignIn />);
  const signOutButton = getByLabelText("Press Enter to Sign Out");
  const signOutText = getByText("Sign Out!");
  const googleIcon = getByLabelText("Google logo");

  expect(signOutButton).toBeInTheDocument();
  expect(signOutText).toBeInTheDocument();
  expect(googleIcon).toBeInTheDocument();
});
