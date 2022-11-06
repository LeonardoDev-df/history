import styled, { css } from 'styled-components';

interface BoxProps {
  width?: string;
  height?: string;
  bgColor?: string;
}

export const Box = styled.div<BoxProps>`
  ${({ width, height, bgColor }) => css`
    width: ${width || '100px'};
    height: ${height || '100px'};
    background-color: ${bgColor || 'blue'};
  `}
`;
