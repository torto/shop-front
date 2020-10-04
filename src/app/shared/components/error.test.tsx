import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Error from "./error";

test("render error", () => {
  const { asFragment } = render(<Error error="Test error" />);

  expect(asFragment()).toMatchSnapshot();
});
test("render without error", () => {
  const { asFragment } = render(<Error error="" />);

  expect(asFragment()).toMatchSnapshot();
});
