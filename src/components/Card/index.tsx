import styled from "styled-components";

const Card = ({
  name,
  email,
  website,
  color = "lightblue",
}: User & { color?: string }) => {
  return (
    <CardContainer color={color} role="card">
      <Name>{name}</Name>
      <Email>{email}</Email>
      <Website>{website}</Website>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  background-color: ${({ color }) => color};
  padding: 1rem 2rem 2rem 2rem;
`;

const Name = styled.h3`
  font-size: 1.4rem;
  font-wight: bold;
  margin-bottom: 1rem;
`;

const Email = styled.div``;
const Website = styled.div``;
export default Card;
