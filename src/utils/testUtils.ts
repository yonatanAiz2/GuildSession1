import { screen } from "@testing-library/react";

export const getLoader = () => screen.getByText(/loading/i);
export const getUserCardByName = (name: string) => screen.getByText(name);
export const getUserInputId = () =>
  screen.getByPlaceholderText(/enter user id to fetch/i);
export const getSubmitButton = () => screen.getByText("submit");
