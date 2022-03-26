import styled from 'styled-components';

const Spacer = styled.div<{ h?: number }>`
  height: ${props => (props.h ? `${props.h * 8}px` : '8px')};
`;
export default Spacer;
