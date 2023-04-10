import React, { FC, memo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ILeafBasket, useLeaf } from 'widgets/Leaf';
import { Flex, Gap, Table, Button } from 'UI';
import { dateHelper, getCurrency } from 'shared';

import s from './LeafBasketItem.module.scss';

interface IProps {
  item: ILeafBasket;
}

const init = { opacity: 0 };

const LeafBasketItem: FC<IProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { onRemoveFromLeafBasket } = useLeaf();

  return (
    <Flex full justify='space-between'>
      <div>
        <div>
          Добавлено в корзину: {dateHelper.getTimeString(item.addedAt, 'ru')}
        </div>
        <Gap y={10} />
        <div>Цена: {getCurrency(item.summa, 'BYN')}</div>
        <AnimatePresence>
          {isOpen && (
            <motion.div animate={{ opacity: 1 }} initial={init} exit={init}>
              <Gap y={10} />
              <Table
                head={['Название', 'Количество', 'Цена (BYN)']}
                rows={item.info}
              />
              <Gap y={15} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Flex>
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? 'Скрыть' : 'Подробнее'}
        </Button>
        <Button onClick={() => onRemoveFromLeafBasket(item.id)}>Удалить</Button>
      </Flex>
    </Flex>
  );
};

export default memo(LeafBasketItem);
