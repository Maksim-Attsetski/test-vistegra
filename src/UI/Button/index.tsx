import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  memo,
} from 'react';
import s from './Button.module.scss';

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
const Button: FC<IProps> = ({ ...props }) => {
  return (
    <button className={[props.className, s.button].join(' ')} {...props}>
      {props?.children}
    </button>
  );
};

export default memo(Button);
