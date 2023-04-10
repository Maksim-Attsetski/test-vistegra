import React, { FC, memo } from 'react';

import './App.scss';
import { CalcForm, LeafsTable } from 'widgets/Leaf';

const App: FC = () => {
  return (
    <div className='container'>
      <CalcForm />
      <LeafsTable />
    </div>
  );
};

export default memo(App);
