import React, { FC, memo } from 'react';

interface IProps {
  y?: number;
  x?: number;
}

const Gap: FC<IProps> = ({ x = 0, y = 0 }) => {
  return (
    <div
      style={{ marginTop: y, marginBottom: y, marginLeft: x, marginRight: x }}
    />
  );
};

export default memo(Gap);
