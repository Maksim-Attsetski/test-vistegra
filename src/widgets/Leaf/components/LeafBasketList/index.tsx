import React, { FC, memo, useEffect, useMemo } from 'react';

import { useLeaf } from 'widgets/Leaf';
import { Flex, Gap } from 'UI';
import { getCurrency } from 'shared';

import LeafBasketItem from '../LeafBasketItem';
import s from './LeafBasketList.module.scss';

const LeafBasketList: FC = () => {
  const { onGetLeafBasket, leafBasket } = useLeaf();

  const totalSumma = useMemo(() => {
    const price = leafBasket.reduce((prev, cur) => (prev += cur.summa), 0);
    return getCurrency(price, 'BYN');
  }, [leafBasket]);

  useEffect(() => {
    onGetLeafBasket();
  }, []);

  return (
    <Flex justify='space-between'>
      {leafBasket.length > 0 ? (
        leafBasket.map((el) => <LeafBasketItem key={el.id} item={el} />)
      ) : (
        <div>Корзина пуста</div>
      )}
      <Gap y={15} />
      <div className={s.totalSumma}>Сумма за все: {totalSumma}</div>
    </Flex>
  );
};

export default memo(LeafBasketList);
