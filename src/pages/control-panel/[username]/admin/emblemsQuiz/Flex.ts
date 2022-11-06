import styled, { css } from 'styled-components';

interface FlexProps {
  /* activate flexbox for top element */
  container?: boolean;
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'center'
    | 'initial'
    | 'inherit';
  direction?: 'column' | 'row';
  flexWrap?: 'wrap' | 'nowrap' | 'reverse';
  height?: string;
  maxHeight?: string;
  width?: string;
  maxWidth?: string;
  alignSelf?: 'stretch' | 'center' | 'start' | 'end';
  justifySelf?: 'stretch' | 'center' | 'start' | 'end';
  bgColor?: string;
  flex?: string;
  flexBasis?: string;
  flexGrow?: number;
  flexShrink?: number;

  /* padding and margin */
  padding?: number | number[];
  margin?: number | number[];

  pushDown?: boolean;
  pushLeft?: boolean;
  pushRight?: boolean;
  pushTop?: boolean;
}

export const Flex = styled.div<FlexProps>`
  ${({
    container,
    alignItems,
    justifyContent,
    direction,
    flexWrap,
    height,
    maxHeight,
    bgColor,
    flex,
    flexBasis,
    flexGrow,
    flexShrink,
    width,
    maxWidth,
    padding,
    margin,
    justifySelf,
    alignSelf,
    pushDown,
    pushLeft,
    pushRight,
    pushTop,
  }) => css`
    display: ${container ? 'flex' : 'block'};
    ${justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
    ${alignItems &&
    css`
      align-items: ${alignItems};
    `}
      ${direction &&
    css`
      flex-direction: ${direction};
    `}
    ${flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `}
    ${height &&
    css`
      height: ${height};
    `}
    ${maxHeight &&
    css`
      max-height: ${maxHeight};
    `}
    ${width &&
    css`
      width: ${width};
    `}
    ${maxWidth &&
    css`
      max-width: ${maxWidth};
    `}
    ${bgColor &&
    css`
      background-color: ${bgColor};
    `}
    /* additional flex properties */
    ${flex &&
    css`
      flex: ${flex};
    `}
    ${flexGrow &&
    css`
      flex-grow: ${flexGrow};
    `}
    ${flexShrink &&
    css`
      flex-shrink: ${flexShrink};
    `}
    ${flexBasis &&
    css`
      flex-basis: ${flexBasis};
    `}
    ${alignSelf &&
    css`
      align-self: ${alignSelf};
    `}
    ${justifySelf &&
    css`
      justify-self: ${justifySelf};
    `}
    ${handleMarginOrPadding(margin)}
    ${handleMarginOrPadding(padding, true)}
    ${pushDown &&
    css`
      margin-top: auto;
    `}
    ${pushTop &&
    css`
      margin-bottom: auto;
    `}
    ${pushLeft &&
    css`
      margin-right: auto;
    `}
    ${pushRight &&
    css`
      margin-left: auto;
    `}
  `}
`;

const handleMarginOrPadding = (
  values?: number | number[],
  isPadding?: boolean
) => {
  if (!values) return;

  if (Array.isArray(values)) {
    if (values.length > 4) {
      throw new Error(`${isPadding ? 'Padding' : 'Margin'} can have 4 values`);
    }

    // [1, 2] => '1rem 2rem'
    const convertValuesArrayToString = values
      .map((v) => (v === 0 ? 0 : `${v}rem`))
      .join(' ');

    if (isPadding) {
      return css`
        padding: ${convertValuesArrayToString};
      `;
    }

    return css`
      margin: ${convertValuesArrayToString};
    `;
  }

  if (isPadding) {
    return css`
      padding: ${values}rem;
    `;
  }

  return css`
    margin: ${values}rem;
  `;
};
