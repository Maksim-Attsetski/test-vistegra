import React, { FC, memo } from 'react';
import s from './LeafsTable.module.scss';
import { useLeaf } from 'widgets/Leaf';
import { Table } from 'UI';

const LeafsTable: FC = () => {
  const { calcResult } = useLeaf();

  return (
    <div>
      {calcResult.length > 0 && (
        <Table head={['Name', 'Count', 'Price', 'Actions']} rows={calcResult} />
      )}
    </div>
  );
};

export default memo(LeafsTable);
