import React from "react";
import { render } from "@testing-library/react";
import CardEmpty from "./card-empty";



test("renders card empty", () => {
    const { asFragment } = render(<CardEmpty />);

    expect(asFragment()).toMatchSnapshot();

});