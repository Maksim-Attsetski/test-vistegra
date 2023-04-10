import React, { FC, memo } from 'react';

import { useLeaf } from 'widgets/Leaf';
import { Button, Gap, Table } from 'UI';

import s from './LeafsTable.module.scss';

const LeafsTable: FC = () => {
  const { calcResult, onAddToLeafBasket } = useLeaf();

  return (
    <div>
      {calcResult.length > 0 ? (
        <>
          <Table
            head={['Название', 'Количество', 'Цена (BYN)']}
            rows={calcResult}
          />
          <Gap y={15} />
          <Button onClick={() => onAddToLeafBasket()}>
            Добавить изделие в корзину
          </Button>
        </>
      ) : (
        <div>Здесь будет результат изделия</div>
      )}
    </div>
  );
};

export default memo(LeafsTable);
