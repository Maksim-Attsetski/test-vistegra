import React, { FC, memo, PropsWithChildren } from 'react';
import s from './Flex.module.scss';

interface IProps extends PropsWithChildren {
  gap?: string;
  justify?: 'center' | 'space-between' | 'flex-start' | 'flex-end';
}
const Flex: FC<IProps> = ({
  justify = 'center',
  gap = '10px 10px',
  children,
}) => {
  return (
    <div className={s.flex} style={{ justifyContent: justify, gap }}>
      {children}
    </div>
  );
};

export default memo(Flex);
