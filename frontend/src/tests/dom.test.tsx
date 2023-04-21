import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import {jest} from '@jest/globals'
import "@testing-library/dom";
import "@testing-library/jest-dom";

import App from "../App"
import {ProductDescription} from  "../components"
import {SearchBar} from "../components"
import {SearchResults} from "../components"

beforeEach(() => {});

test("renders components", () => {
  render(<App />);
  expect(screen.getByRole("search-bar-container")).toBeInTheDocument();
  expect(screen.getByRole("search-bar")).toBeInTheDocument();

  expect(screen.getByRole("product-description")).toBeInTheDocument();
  expect(screen.getByRole("search-results")).toBeInTheDocument();
});
