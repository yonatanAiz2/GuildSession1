import axios from "axios";
import { API_MAIN } from "../constants/api";

export const fetchUser = async (id: number) => {
  const { data: user } = await axios.get<User>(`${API_MAIN}/users/${id}`);
  return user;
};
