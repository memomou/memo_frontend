import styled from 'styled-components';

interface TextProps {
  $bgColor?: string;
  $width?: string;
  $height?: string;
  $fontSize?: string;
}

interface RadiusTextProps extends TextProps {
  $radiusPx?: string;
}

const Text = styled.div<TextProps>`
  background-color: ${(props) => props.$bgColor};
  font-size: 2rem;
  height: 50px;
`;

const RadiusText = styled(Text)<RadiusTextProps>`
  border-radius: ${(props) => props.$radiusPx || '10px'};
`;

export { Text, RadiusText };
export type { TextProps, RadiusTextProps };

