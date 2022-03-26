import styled from 'styled-components';

const NeumorphismButton = styled.button`
  user-select: none;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  &:active {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      inset -3px -3px 5px rgba(255, 255, 255, 1);
  }
  &:disabled {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      inset -3px -3px 5px rgba(255, 255, 255, 1);
  }
  & + & {
    margin: 0px;
  }
`;
export default NeumorphismButton;
