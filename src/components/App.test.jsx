import { render } from "@testing-library/react";
import App from "./App";

test("hello", () => {
  render(<App />);

  expect(true).toBe(false);
});
