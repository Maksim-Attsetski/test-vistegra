import React, { FC, FormEvent, useState } from 'react';

import { Button, Flex, Gap, Input, Select } from 'UI';
import { leafs, leafConfig, IConfig } from 'shared';
import './App.scss';

const leafList = leafs.filter((el) => el.type === 'list');
const leafOptions: string[] = leafList.map((el) => el.name);

const pipeList = leafs.filter((el) => el.type === 'pipe');
const pipeOptions: string[] = pipeList.map((el) => el.name);

const hardnessList = leafConfig.filter((el) => el.type === 'frame');
const hardnessOptions: string[] = hardnessList.map((el) => el.name);

const inputConfig: {
  width?: IConfig;
  length?: IConfig;
} = leafConfig
  .filter(
    (el) => el.type === 'size' && (el.key === 'length' || el.key === 'width')
  )
  .reduce((prev, cur) => ({ ...prev, [cur.key]: cur }), {});

const App: FC = () => {
  const [activeLeaf, setActiveLeaf] = useState(leafOptions[0]);
  const [activePipe, setActivePipe] = useState(pipeOptions[0]);
  const [activeHardness, setActiveHardness] = useState(hardnessOptions[0]);

  const [width, setWidth] = useState<string>('');
  const [length, setLength] = useState<string>('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const widthMaxLimit = inputConfig.width?.max || 0;
      const widthMinLimit = inputConfig.width?.min || 0;

      if (+width > widthMaxLimit) {
        throw new Error('Max width limit is ' + widthMaxLimit);
      }
      if (+width < widthMinLimit) {
        throw new Error('Min width limit is ' + widthMinLimit);
      }

      const lengthMaxLimit = inputConfig.length?.max || 0;
      const lengthMinLimit = inputConfig.length?.min || 0;
      if (+length > lengthMaxLimit) {
        throw new Error('Max length limit is ' + lengthMaxLimit);
      }
      if (+length < lengthMinLimit) {
        throw new Error('Min length limit is ' + lengthMinLimit);
      }

      const currentLeaf = leafList.find((leaf) => leaf.name === activeLeaf);
      if (!currentLeaf) {
        throw new Error('Нет такого листа');
      }

      const currentPipe = pipeList.find((pipe) => pipe.name === activePipe);
      if (!currentPipe) {
        throw new Error('Нет такой трубы');
      }

      const currentHardness = leafConfig.find(
        (el) => el.name === activeHardness
      );
      if (!currentHardness) {
        throw new Error('Твердость не найдена');
      }

      const currentFixConfig = leafConfig.find(
        (el) => el.key === currentLeaf.material && el.type === 'fix'
      );
      const currentFix = leafs.find((el) => el.type === 'fix');
      if (!currentFix || !currentFixConfig) {
        throw new Error('Саморезы не найдены');
      }

      const getPipeCount = (isWidth?: boolean): number => {
        // (length мм - pipeWidth мм) / (difference мм + pipeWidth мм) = count труб в погонном метре.
        // (length мм / (pipeWidth мм + difference мм)) x count = всего труб
        const length = (isWidth ? currentLeaf.width || 1 : 1) * 1000; // length or width of leaf in mm
        const difference = Math.abs(
          length - (currentHardness?.step || 0) * 1000
        );
        const pipeWidth = +(currentPipe.width || 1); // width of pipe
        const pipeCountInMetr = (length - pipeWidth) / (difference + pipeWidth); // pipes in one "мп"
        const pipeCount = (length / (pipeWidth + difference)) * pipeCountInMetr; // all pipes

        return Math.round(pipeCount);
      };

      const square = +width * +length;
      const leafCount = Math.floor((square / (currentLeaf?.width || 1)) * 1);
      const fixCount = square * +(currentFixConfig?.value || 1);

      const pipeCountInWidth = getPipeCount(true);
      const pipeCountInLength = getPipeCount(false);

      const priceForLeaf = Math.round(leafCount * currentLeaf.price);
      const priceForPipe = Math.round(leafCount * currentPipe.price);
      const priceForFix = Math.round(fixCount * currentFix.price);

      console.log('S: ' + square);
      console.log('Count: ' + leafCount);
      console.log('Pipe count: ' + pipeCountInWidth, pipeCountInLength);
      console.log('Fix count: ' + fixCount);
      console.log('Summa for leaf: ' + priceForLeaf);
      console.log('Summa for pipe: ' + priceForPipe);
      console.log('Summa for fix: ' + priceForFix);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <Flex justify='flex-start'>
          <Input
            value={width}
            setValue={setWidth}
            label='Width'
            type='number'
          />
          <Input
            value={length}
            setValue={setLength}
            label='Length'
            type='number'
          />
        </Flex>
        <Gap y={10} />
        <Button type='submit'>Confirm</Button>
      </form>
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
