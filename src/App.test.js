import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders an editor element", () => {
  render(<App />);
  const editorElement = screen.getByTestId(/editor/i);
  expect(editorElement).toBeInTheDocument();
});

test("renders a preview element", () => {
  render(<App />);
  const previewElement = screen.getByTestId(/preview/i);
  expect(previewElement).toBeInTheDocument();
});
