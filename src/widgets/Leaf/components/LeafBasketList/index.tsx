import React, { FC, memo, useEffect } from 'react';
import s from './LeafBasketList.module.scss';
import { useLeaf } from 'widgets/Leaf';
import { Button, Table } from 'UI';

const LeafBasketList: FC = () => {
  const { onGetLeafBasket, leafBasket, onRemoveFromLeafBasket } = useLeaf();

  useEffect(() => {
    onGetLeafBasket();
  }, []);

  return (
    <div>
      {leafBasket.length > 0 ? (
        leafBasket.map((item) => (
          <div key={item.id}>
            <div>Добавлено: {new Date(item.addedAt).toDateString()}</div>
            <div>Цена: {item.summa}</div>
            <Table head={['Название', 'Количество', 'Цена']} rows={item.info} />
            <Button onClick={() => onRemoveFromLeafBasket(item.id)}>
              Удалить
            </Button>
          </div>
        ))
      ) : (
        <div>Корзина пуста</div>
      )}
    </div>
  );
};

export default memo(LeafBasketList);
