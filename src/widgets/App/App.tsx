import React, { FC, memo } from 'react';

import { CalcForm, LeafsTable } from 'widgets/Leaf';
import { Gap } from 'UI';

import './App.scss';

const App: FC = () => {
  return (
    <div className='container'>
      <CalcForm />
      <hr />
      <Gap y={15} />
      <LeafsTable />
    </div>
  );
};

export default memo(App);
