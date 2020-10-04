import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/repository/repository";
import RepositoryItem from "./repository-item";
import { createStore } from 'redux';

const repositoryMock = {
  repository: {
    data: {
      id: 1,
      name: "name",
      html_url: "http://aa.com",
      description: "description",
      created_at: "2020-10-04T12:04:29.676Z",
      avatar_url: "http://aa.com.image.jps",
      stargazers_count: 1000,
      type: "User",
      login: "torto",
      isStar: false,
    },
  },
};

test("renders component and trigger handleToggleStar", () => {
  const storeMock = createStore(store, { ...repositoryMock } as any);
  storeMock.dispatch = jest.fn();
  
  const {getByRole} = render(
      <Provider store={storeMock}>
      <RepositoryItem id={1} />
    </Provider>
  );
  
  fireEvent.click(getByRole("button"));
  expect(storeMock.dispatch).toHaveBeenCalledTimes(2);
});

test("renders component and trigger handleToggleStar", () => {
    const storeMock = createStore(store, { repository: { data: {} } } as any);
    storeMock.dispatch = jest.fn();
    
  const { asFragment } = render(
    <Provider store={storeMock}>
      <RepositoryItem id={1} />
    </Provider>
  );

  expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
  expect(asFragment()).toMatchSnapshot();

});
