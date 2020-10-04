import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/repository/repository";
import RepositoriesList from "./repositories-list";
import { createStore } from "redux";
import { IRepositoriesState, IRepository } from "../../../store/repositories";
import faker from "faker";
import {
  createMuiTheme,
  CssBaseline,
  Grid,
  MuiThemeProvider,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#fff",
    },
    background: {
      default: "#fff",
    },
  },
});

const repositoryGenerator = () =>
  ({
    id: faker.random.number(),
    name: faker.internet.userName(),
    html_url: faker.internet.url(),
    description: faker.commerce.productDescription(),
    created_at: faker.date.past().toISOString(),
    avatar_url: faker.image.imageUrl(),
    stargazers_count: faker.random.number(),
    type: "User",
    login: faker.internet.userName(),
  } as IRepository);

test("renders component", () => {
  const repositoriesMock: IRepositoriesState = {
    data: [1, 2, 3, 4].map(() => repositoryGenerator()) as [IRepository],
    isLoading: false,
    total: 20,
    error: null,
  };
  const storeMock = createStore(store, {
    repositories: { ...repositoriesMock },
    repository: { data: {} },
  } as any);
  storeMock.dispatch = jest.fn();

  act(() => {
    render(
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={storeMock}>
          <Grid container spacing={2}>
            <Grid item style={{ height: "800px" }} xs={12} sm={3}>
              <RepositoriesList />
            </Grid>
          </Grid>
        </Provider>
      </MuiThemeProvider>
    );
  });

  expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
  expect(screen.getByText(/Top Repositories/i)).toBeInTheDocument();
  const firstLine = screen.getByText(repositoriesMock.data?.[0]?.name ?? "");
  expect(firstLine).toBeInTheDocument();
  act(() => {
    fireEvent.click(firstLine);
  });
  expect(storeMock.dispatch).toHaveBeenCalledTimes(2);
});
