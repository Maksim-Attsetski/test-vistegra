import React, { FC, useState } from 'react';

import { Gap, Input, Select } from 'UI';
import { leafs, leafConfig } from 'shared';
import './App.scss';

const leafList = leafs.filter((el) => el.type === 'list');
const leafOptions: string[] = leafList.map((el) => el.name);

const pipeList = leafs.filter((el) => el.type === 'pipe');
const pipeOptions: string[] = pipeList.map((el) => el.name);

const hardnessList = leafConfig.filter((el) => el.type === 'frame');
const hardnessOptions: string[] = hardnessList.map((el) => el.name);

const App: FC = () => {
  const [activeLeaf, setActiveLeaf] = useState(leafOptions[0]);
  const [activePipe, setActivePipe] = useState(pipeOptions[0]);
  const [activeHardness, setActiveHardness] = useState(hardnessOptions[0]);

  const [width, setWidth] = useState<string>('');
  const [heigth, setHeigth] = useState<string>('');

  return (
    <div className='container'>
      <Input value={width} setValue={setWidth} label='Width' />
      <Input value={heigth} setValue={setHeigth} label='Heigth' />
      <Gap y={15} />
      <Select
        options={leafOptions}
        value={activeLeaf}
        onChange={setActiveLeaf}
      />
      <Gap y={10} />
      <Select
        options={pipeOptions}
        value={activePipe}
        onChange={setActivePipe}
      />
      <Gap y={10} />
      <Select
        options={hardnessOptions}
        value={activeHardness}
        onChange={setActiveHardness}
      />
      <div>sddd</div>
    </div>
  );
};

export default App;
