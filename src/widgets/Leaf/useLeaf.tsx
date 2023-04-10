import { useEffect } from 'react';

import { useActions, useTypedSelector } from 'shared';
import { leafService } from './service';
import { ILeafBasket } from './types';

// #NOTE This hook is needed for connect server response and state manager (redux)
export const useLeaf = (getOnInit?: boolean) => {
  const { leafs, fixes, pipes, calcResult, leafBasket } = useTypedSelector(
    (state) => state.leafs
  );
  const { action } = useActions();

  const onGetLeafs = async () => {
    const response = await leafService.getLeafs();

    action.setLeafsAC(response.filter((el) => el.type === 'list'));
    action.setFixesAC(response.filter((el) => el.type === 'fix'));
    action.setPipesAC(response.filter((el) => el.type === 'pipe'));
  };

  const onGetLeafBasket = async () => {
    const response = await leafService.getLeafBasket();

    action.setLeafBasketAC(response);
  };

  const onAddToLeafBasket = () => {
    if (calcResult.length === 0) return;
    const summa = calcResult.reduce(
      (acc, cur) => (acc += +cur.data[2].text),
      0
    );
    const newBasketItem: ILeafBasket = {
      info: calcResult,
      addedAt: Date.now(),
      id: Math.random(),
      summa,
    };

    action.addToLeafBasketAC(newBasketItem);
  };

  const onRemoveFromLeafBasket = (id: number) => {
    action.removeFromLeafBasketAC(id);
  };

  useEffect(() => {
    getOnInit && onGetLeafs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOnInit]);

  return {
    leafs,
    fixes,
    pipes,
    calcResult,
    leafBasket,
    onGetLeafBasket,
    onGetLeafs,
    onAddToLeafBasket,
    onRemoveFromLeafBasket,
  };
};
