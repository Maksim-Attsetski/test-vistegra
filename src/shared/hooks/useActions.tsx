import { bindActionCreators } from 'redux';

import { useTypedDispatch } from './redux';
import { leafActions } from 'widgets/Leaf';

const useActions = () => {
  const dispatch = useTypedDispatch();

  const allActions = { ...leafActions };

  const action = bindActionCreators(allActions, dispatch);

  return { action };
};

export default useActions;
