import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import axios from "axios";
import { apiUrl, repositoriesPath } from "../../shared/constants";

import { IRepositoriesState, IRepositoriesQuery, IRepositoriesData } from "./model";

const repositoriesUrl = `${apiUrl}${repositoriesPath}`;

const initialState: IRepositoriesState = {
  data: [],
  total: 0,
  isLoading: true,
  error: null,
};

export const slice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    setRepositories: (state, action: PayloadAction<IRepositoriesData>) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.error = null;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = [];
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setRepositories, setLoading, setError } = slice.actions;

export const getRepositories = ({
  date = "",
  language = "",
  sort = "",
  order = "",
  page = 0,
  perPage = 100,
}: IRepositoriesQuery): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  const url = `${repositoriesUrl}?${date ? `date=${date}&` : ""}${
    language ? `language=${language}&` : ""
  }${sort ? `sort=${sort}&` : ""}${order ? `order=${order}&` : ""}${
    page ? `page=${page}&` : ""
  }${perPage ? `perPage=${perPage}&` : ""}`;

  try {
    const { data } = await axios.get(url);
    dispatch(setRepositories(data));
  } catch (err) {
    dispatch(setError(err.message));
    console.error("Error to get repositories:", err.message);
  }
};

export const repositories = (state: RootState) => state.repositories;

export default slice.reducer;
