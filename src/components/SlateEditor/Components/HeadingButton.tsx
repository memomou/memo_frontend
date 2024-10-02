import React from 'react';
import { BlockButton } from '../components';

interface HeadingButtonProps {
  level: 1 | 2 | 3 | 4;
}

const mapLevelToIcon = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
};

const HeadingButton: React.FC<HeadingButtonProps> = ({ level }) => {
  return (
    <BlockButton
      format={`heading-${mapLevelToIcon[level]}`}
      icon={`looks_${mapLevelToIcon[level]}`}
      style={{ innerHeight: "2.4rem" }}
    >
      <div
        style={{
          fontFamily: "serif",
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      >
        <span>H</span>
        <span style={{ fontFamily: "serif", fontSize: "0.9rem" }}>{level}</span>
      </div>
    </BlockButton>
  );
};

export default HeadingButton;
