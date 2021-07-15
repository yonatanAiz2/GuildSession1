import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { fetchUsers } from "../../utils/fetchUsers";
import Card from "../Card";
import UserForm from "./UserForm";

const Mocking = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchAndSetUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  if (!users.length) {
    return <h3>Loading...</h3>;
  }

  return (
    <Container>
      <Title>Mocking</Title>
      <CardsContainer>
        {users.map((user) => (
          <Card {...user} key={user.id} />
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

export default Mocking;
