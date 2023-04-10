import React, { FC, memo } from 'react';

import { CalcForm, LeafBasketList, LeafsTable } from 'widgets/Leaf';
import { Gap } from 'UI';

import './App.scss';

const App: FC = () => {
  return (
    <div className='container'>
      <CalcForm />
      <hr />
      <Gap y={15} />
      <LeafsTable />
      <Gap y={15} />
      <hr />
      <Gap y={15} />
      <LeafBasketList />
    </div>
  );
};

export default memo(App);
