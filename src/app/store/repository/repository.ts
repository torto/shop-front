import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

import { IRepositoryItem, IRepositoryItemState } from "./model";


const initialState: IRepositoryItemState = {
  data: {} as IRepositoryItem,
};

export const slice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setRepositoryAction: (state, action: PayloadAction<IRepositoryItem>) => {
      state.data = action.payload;
    },
    toggleStarAction: (state, action: PayloadAction<IRepositoryItem>) => {
      state.data = action.payload;
    },
    cleanRepository: (state) => {
      state.data = {} as IRepositoryItem;
    },
  },
});

export const {
  setRepositoryAction,
  toggleStarAction,
  cleanRepository,
} = slice.actions;

export const getRepository = (id: number): AppThunk => (dispatch, state) => {
  const data = { ...state().repositories.data.filter(
    (item) => item.id === id
  )[0] as IRepositoryItem };
  
  if (!data) {
    return;
  }
  
  if (localStorage.getItem(`${id}`)) {
    data.isStar = true;
  } else {
    data.isStar = false;
  }
  dispatch(setRepositoryAction(data));
};
export const toggleStar = (id: number): AppThunk => async (dispatch, state) => {
  if (localStorage.getItem(`${id}`)) {
    localStorage.removeItem(`${id}`);
    dispatch(
      toggleStarAction({
        ...state().repository.data,
        isStar: false,
      } as IRepositoryItem)
    );
  } else {
    localStorage.setItem(`${id}`, "true");
    dispatch(
      toggleStarAction({
        ...state().repository.data,
        isStar: true,
      } as IRepositoryItem)
    );
  }
};

export const repository = (state: RootState) => state.repository as IRepositoryItemState;

export default slice.reducer;
