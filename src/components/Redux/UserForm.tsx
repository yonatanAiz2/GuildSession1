import { useEffect, useState } from "react";
import { fetchUser } from "../../utils/fetchUser";
import styled from "styled-components";
import { getUserThunk, userInit, userSelector } from "./store/users.redux";
import { useDispatch, useSelector } from "react-redux";

const UserForm = () => {
  const dispatch = useDispatch();
  const { data: user, status } = useSelector(userSelector);
  const [userId, setUserId] = useState<number>(0);

  const fetchUserById = async () => {
    dispatch(getUserThunk(userId));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.target.value));
  };

  const isIdValid = () => userId <= 10 && userId > 0;

  useEffect(() => {
    if (isIdValid() && status === "success") {
      console.log(user);
      setUserId(0);
      dispatch(userInit());
    }
  }, [user, status, userId]);

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
      <button type="button" disabled={!isIdValid()} onClick={fetchUserById}>
        submit
      </button>
    </form>
  );
};

export const Input = styled.input`
  margin: 0rem 0.2rem 4rem 3.5rem;
`;

export default UserForm;
