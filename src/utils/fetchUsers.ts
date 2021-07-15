import axios from "axios";
import { API_MAIN } from "../constants/api";

export const fetchUsers = async () => {
  const { data: users } = await axios.get<User[]>(`${API_MAIN}/users`);
  return users;
};
