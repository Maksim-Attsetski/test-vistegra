import React, { FC, memo, PropsWithChildren, useMemo } from 'react';
import s from './Flex.module.scss';

interface IProps extends PropsWithChildren {
  gap?: string;
  justify?: 'center' | 'space-between' | 'flex-start' | 'flex-end';
  full?: boolean;
}
const Flex: FC<IProps> = ({
  justify = 'center',
  gap = '10px 10px',
  full = false,
  children,
}) => {
  const width = useMemo(() => (full ? { width: '100%' } : {}), [full]);

  return (
    <div className={s.flex} style={{ justifyContent: justify, gap, ...width }}>
      {children}
    </div>
  );
};

export default memo(Flex);
