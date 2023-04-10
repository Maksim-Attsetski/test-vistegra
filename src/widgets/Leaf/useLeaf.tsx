import { useEffect } from 'react';

import { useActions, useTypedSelector } from 'shared';
import { leafService } from './service';

// #NOTE This hook is needed for connect server response and state manager (redux)
export const useLeaf = (getOnInit?: boolean) => {
  const { leafs, fixes, pipes, calcResult } = useTypedSelector(
    (state) => state.leafs
  );
  const { action } = useActions();

  const onGetLeafs = async () => {
    const response = await leafService.getLeafs();

    action.setLeafsAC(response.filter((el) => el.type === 'list'));
    action.setFixesAC(response.filter((el) => el.type === 'fix'));
    action.setPipesAC(response.filter((el) => el.type === 'pipe'));
  };

  useEffect(() => {
    getOnInit && onGetLeafs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOnInit]);

  return { leafs, fixes, pipes, calcResult };
};
