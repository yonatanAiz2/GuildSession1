import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../Card";
import { getUsersThunk, usersSelector } from "./store/users.redux";
import UserForm from "./UserForm";

const Redux = () => {
  const dispatch = useDispatch();
  const { data: users, status } = useSelector(usersSelector);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  // console.log(status);
  if (status === "pending" || status === "idle") {
    return <h3>Loading...</h3>;
  }

  if (!users.length) {
    return <div>no users</div>;
  }

  return (
    <Container>
      <Title>Redux</Title>
      <CardsContainer>
        {users.map((user) => (
          <Card color="palevioletred" {...user} key={user.id} />
        ))}
      </CardsContainer>
      <UserForm />
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  width: 100%;
  text-align: left;
`;

const Title = styled.h2``;
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default Redux;
