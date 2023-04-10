import React, { FC, memo, useEffect } from 'react';
import s from './LeafBasketList.module.scss';
import { useLeaf } from 'widgets/Leaf';
import { Button, Flex, Table } from 'UI';

const LeafBasketList: FC = () => {
  const { onGetLeafBasket, leafBasket, onRemoveFromLeafBasket } = useLeaf();

  useEffect(() => {
    onGetLeafBasket();
  }, []);

  return (
    <Flex justify='space-between'>
      {leafBasket.length > 0 ? (
        leafBasket.map((item) => (
          <div key={item.id} className={s.item}>
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
    </Flex>
  );
};

export default memo(LeafBasketList);
