import { useState } from "react";
import { fetchUser } from "../../utils/fetchUser";
import styled from "styled-components";

const UserForm = () => {
  const [userId, setUserId] = useState<number>(0);

  const fetchUserById = async () => {
    try {
      const user = await fetchUser(userId);
      console.log(user);
      setUserId(0);
    } catch (e) {
      console.error(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.target.value));
  };

  return (
    <form>
      <label htmlFor="id">id</label>
      <Input
        id="id"
        value={userId}
        onChange={onChange}
        placeholder="enter user id to fetch"
        type="number"
      />
      <button
        type="button"
        disabled={userId >= 10 || userId <= 0}
        onClick={fetchUserById}
      >
        submit
      </button>
    </form>
  );
};

export const Input = styled.input`
  margin: 0rem 0.2rem 4rem 3.5rem;
`;

export default UserForm;
