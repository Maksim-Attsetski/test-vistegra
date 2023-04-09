import React, {
  DetailedHTMLProps,
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  memo,
  useState,
} from 'react';
import s from './Input.module.scss';

interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  focusOnInit?: boolean;
  label?: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input: FC<IProps> = ({
  focusOnInit = false,
  className = '',
  label = '',
  setValue,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(focusOnInit);
  return (
    <div
      className={[
        (isFocused || String(props.value).length > 0) && s.focused,
        s.container,
      ].join(' ')}
    >
      {label && <div className={s.label}>{label}</div>}
      <input
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        className={[s.input, className].join(' ')}
        {...props}
      />
    </div>
  );
};

export default memo(Input);
