import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CardRepository from "./card-repository";

const setup = (props: any) => {
    const newProps = {
      name: "name",
      html_url: "http://aa.com",
      description: "description",
      created_at: "2020-10-04T12:04:29.676Z",
      avatar_url: "http://aa.com.image.jps",
      stargazers_count: 1000,
      type: "User",
      login: "torto",
      isStar: false,
      handleToggleStar: jest.fn(),
      ...props
    };
    
    const target = render(<CardRepository {...newProps} />);
    return target;

}


test("renders card - isStart: false - avatar is present", () => {
  const { asFragment } = setup({});

  expect(asFragment()).toMatchSnapshot();
});
test("renders card - isStart: true - avatar is not present", () => {
  const { asFragment } = setup({
    isStar: true,
    avatar_url: ''
  });

  expect(asFragment()).toMatchSnapshot();
});

test("trigger start click", () => {
    const query = {
      handleToggleStar: jest.fn(),
    };
  const { getByRole } = setup(query);
  fireEvent.click(getByRole('button'));
  expect(query.handleToggleStar).toBeCalled();
});
