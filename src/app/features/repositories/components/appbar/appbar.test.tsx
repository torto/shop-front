import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppBar from "./appbar";
import { IRepositoriesQuery } from "../../../../store/repositories";

const setup = (query: IRepositoriesQuery) => {
  const onChangeLanguage = jest.fn();
  const onChangeDate = jest.fn();

  const target = render(
    <AppBar
      query={query}
      onChangeLanguage={onChangeLanguage}
      onChangeDate={onChangeDate}
    />
  );

  return {
    onChangeDate,
    onChangeLanguage,
    target
  };
};


test("renders without query", () => {
  const {
    target: { getByText, getByPlaceholderText, getByLabelText },
  } = setup({});
  expect(getByText(/Top Repositories/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/Language/i)).toBeInTheDocument();
  expect(getByLabelText(/Since.../i)).toBeInTheDocument();
});
test("renders with query", () => {
  const date = new Date().toISOString();
  const language = "portuguese";
  const {
      target: { getByLabelText, getByPlaceholderText, debug },
    } = setup({
        language,
        date,
        order: "desc",
        page: 1,
        perPage: 100,
        sort: "stars",
    });
    expect(getByPlaceholderText(/Language/i).value).toBe('');
    expect(getByLabelText(/Since.../i).defaultValue).toBe(date);
});

test("trigger onChange events", () => {
    const dateInit = new Date(new Date().setFullYear(1988, 11, 25)).toISOString();
    const date = new Date().toISOString();
    const language = 'portuguese';
    const query = {};
    
    const {
        onChangeLanguage,
        onChangeDate,
        target: { getByLabelText, getByPlaceholderText, debug },
    } = setup({
        language,
        date: dateInit,
        order: "desc",
        page: 1,
        perPage: 100,
        sort: "stars",
    });
    
    const inputLanguage = getByPlaceholderText(/Language/i);
    
    expect(inputLanguage.value).toBe('');
    fireEvent.change(inputLanguage, { target: { value: language } });
    expect(inputLanguage.value).toBe(language);
    expect(onChangeLanguage).toHaveBeenCalled();
    
    const inputDate = getByLabelText(/Since.../i);
    expect(inputDate.defaultValue).toBe(dateInit);
    fireEvent.change(inputDate, { target: { defaultValue: date } });
    expect(onChangeDate).toHaveBeenCalled();
});
