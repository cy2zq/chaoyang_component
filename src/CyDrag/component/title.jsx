// @cy
import styled from "@emotion/styled";

export default styled.h4`
  padding: 16px 16px 0 16px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  margin-bottom: 0;

  &:focus {
    //outline: 2px solid red;
    outline-offset: 2px;
  }
`;
