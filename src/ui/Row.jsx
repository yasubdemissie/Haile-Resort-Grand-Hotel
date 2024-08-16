import styled, { css } from "styled-components";

const Row = styled.div`
  margin: 10px;
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
}

export default Row;
