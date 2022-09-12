
import styled from "styled-components";

export default function MainContainer({ color, children }) {
    return <Wrapper color={color}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 25px 15px 25px;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  background-color: #8C11BE;
`;
