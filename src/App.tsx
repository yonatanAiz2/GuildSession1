import { Provider } from "react-redux";
import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Mocking from "./components/Mocking";
import Redux from "./components/Redux";
import store from "./components/Redux/store";

function App() {
  return (
    <Main>
      <Normalize />
      <Title>Testing with jest and react testing library</Title>
      <Mocking />
      <Provider store={store}>
        <Redux />
      </Provider>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  padding: 2rem 9rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  align-text: center;
`;
export default App;
