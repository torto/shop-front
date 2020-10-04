import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  cleanup,
  within
} from "@testing-library/react";
import DataTable from "./data-table";
import faker from "faker";
import { IRepository } from "../../../store/repositories";
import { FeatureMode } from "@material-ui/data-grid";
import {
  createMuiTheme,
  CssBaseline,
  Grid,
  MuiThemeProvider,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

afterEach(cleanup);

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

test("renders data grid ", async () => {
  const props = {
    isLoading: false,
    data: [1, 2, 3, 4].map(() => repositoryGenerator()) as IRepository[],
    total: 20,
    mode: "client" as FeatureMode,
    autoHeight: true,
    query: {
      perPage: 10,
      page: 1,
      date: "1988-01-01",
      sort: "stars",
      order: "desc",
    },
    onPageChange: jest.fn(),
    onSortChange: jest.fn(),
    onPerPageChange: jest.fn(),
    onRowSelected: jest.fn(),
  };
  act(() => {
    render(
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Grid container spacing={2}>
          <Grid item style={{ height: "800px" }} xs={12} sm={3}>
            <DataTable {...props} />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  });
  props.data.forEach((item) => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
  });
});
