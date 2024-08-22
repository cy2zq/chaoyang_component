// @flow
import styled from "@emotion/styled";

export default styled.h4`
  padding: 8px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  margin-bottom: 0;

  &:focus {
    outline: 2px solid red;
    outline-offset: 2px;
  }
`;
