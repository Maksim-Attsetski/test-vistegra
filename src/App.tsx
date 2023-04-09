import React, { FC, useState } from 'react';

import { Select } from 'UI';
import { leafs } from 'shared';

const leafList = leafs.filter((el) => el.type === 'list');
const leafOptions: string[] = leafList.map((el) => el.name);

const App: FC = () => {
  const [activeLeaf, setActiveLeaf] = useState(leafOptions[0]);
  return (
    <div className='App'>
      <div>{activeLeaf}</div>
      <Select
        options={leafOptions}
        value={activeLeaf}
        onChange={setActiveLeaf}
      />
      <div>sddd</div>
    </div>
  );
};

export default App;
