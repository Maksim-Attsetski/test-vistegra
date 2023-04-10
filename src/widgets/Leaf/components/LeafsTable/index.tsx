import React, { FC, memo } from 'react';

import { useLeaf } from 'widgets/Leaf';
import { Button, Gap, Table } from 'UI';

import s from './LeafsTable.module.scss';

const LeafsTable: FC = () => {
  const { calcResult } = useLeaf();

  return (
    <div>
      {calcResult.length > 0 && (
        <>
          <Table head={['Name', 'Count', 'Price']} rows={calcResult} />
          <Gap y={15} />
          <Button>Добавить изделие в корзину</Button>
        </>
      )}
    </div>
  );
};

export default memo(LeafsTable);
