import React, { FC, FormEvent, memo, useMemo, useState } from 'react';

import { Button, Flex, Gap, Input, Select, ICeil } from 'UI';
import {
  leafConfig,
  IConfig,
  useActions,
  getCeilFromLeaf,
  validator,
  logger,
} from 'shared';
import { useLeaf } from 'widgets/Leaf';

import s from './CalcForm.module.scss';

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

const CalcForm: FC = () => {
  const { fixes, leafs, pipes } = useLeaf(true);
  const { action } = useActions();

  const pipeOptions: string[] = useMemo(
    () => pipes.map((el) => el.name),
    [pipes]
  );
  const leafOptions: string[] = useMemo(
    () => leafs.map((el) => el.name),
    [leafs]
  );

  const [activeLeaf, setActiveLeaf] = useState('Выбери лист');
  const [activePipe, setActivePipe] = useState('Выбери трубу');
  const [activeHardness, setActiveHardness] = useState('Выбери твёрдость');

  const [width, setWidth] = useState<string>('');
  const [length, setLength] = useState<string>('');

  const [errorText, setErrorText] = useState<string>('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      validator.min(width, inputConfig.width?.min || 0, 'ширины');
      validator.max(width, inputConfig.width?.max || 0, 'ширины');
      validator.min(length, inputConfig.length?.min || 0, 'длины');
      validator.max(length, inputConfig.length?.max || 0, 'длины');

      const currentLeaf = leafs.find((leaf) => leaf.name === activeLeaf);
      validator.isExist(currentLeaf, 'Такого листа');

      const currentPipe = pipes.find((pipe) => pipe.name === activePipe);
      validator.isExist(currentPipe, 'Такой трубы');

      const currentHardness = leafConfig.find(
        (el) => el.name === activeHardness
      );
      validator.isExist(currentHardness, 'Такой твёердости');

      const currentFixConfig = leafConfig.find(
        (el) => el.key === currentLeaf?.material && el.type === 'fix'
      );
      const currentFix = fixes[0];
      validator.isExist(currentFix && currentFixConfig, 'Таких саморезов');

      const getPipeCount = (isWidth?: boolean): number => {
        // (length мм - pipeWidth мм) / (difference мм + pipeWidth мм) = count труб в погонном метре.
        // (length мм / (pipeWidth мм + difference мм)) x count = всего труб
        const length = (isWidth ? currentLeaf?.width || 1 : 1) * 1000; // length or width of leaf in mm
        const difference = Math.abs(
          length - (currentHardness?.step || 1) * 1000
        );
        const pipeWidth = +(currentPipe?.width || 1); // width of pipe
        const pipeCountInMetr = (length - pipeWidth) / (difference + pipeWidth); // pipes in one "мп"
        const pipeCount = (length / (pipeWidth + difference)) * pipeCountInMetr; // all pipes

        return Math.round(pipeCount);
      };

      const square = +width * +length;

      const leafCount = Math.floor((square / (currentLeaf?.width || 1)) * 1);
      const fixCount = square * +(currentFixConfig?.value || 1);
      const pipeCountInWidth = getPipeCount(true);
      const pipeCountInLength = getPipeCount(false);

      const pipeResult: ICeil = getCeilFromLeaf(
        currentPipe?.name || '',
        'мп',
        pipeCountInLength + pipeCountInWidth,
        Math.round(leafCount * (currentPipe?.price || 1))
      );
      const leafResult: ICeil = getCeilFromLeaf(
        currentLeaf?.name || '',
        'м2',
        leafCount,
        Math.round(leafCount * (currentLeaf?.price || 1))
      );
      const fixResult: ICeil = getCeilFromLeaf(
        currentFix.name,
        'шт',
        fixCount,
        Math.round(fixCount * currentFix.price)
      );

      action.setCalcResultAC([pipeResult, leafResult, fixResult]);
      setErrorText('');
    } catch (error: any) {
      logger.error(error?.message || error);
      setErrorText(error?.message || error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <Flex justify='flex-start'>
          <Input
            value={width}
            setValue={setWidth}
            label='Ширина'
            type='number'
          />
          <Input
            value={length}
            setValue={setLength}
            label='Длина'
            type='number'
          />
        </Flex>
        <Gap y={20} />
        <Flex justify='flex-start'>
          <Select
            options={leafOptions}
            value={activeLeaf}
            onChange={setActiveLeaf}
          />
          <Select
            options={pipeOptions}
            value={activePipe}
            onChange={setActivePipe}
          />
          <Select
            options={hardnessOptions}
            value={activeHardness}
            onChange={setActiveHardness}
          />
        </Flex>
        <Gap y={15} />
        <Button type='submit'>Подтвердить</Button>
        {errorText && (
          <>
            <Gap y={15} />
            <div className={s.error}>{errorText}</div>
          </>
        )}
      </form>
    </div>
  );
};

export default memo(CalcForm);
