import { useState, memo, FC, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from 'shared';

import s from './Select.module.scss';

interface IProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

//////////////////////////   UL   //////////////////////////////////////
const ulAnimate = { clipPath: 'inset(0% 0% 0% 0% round 10px)' };
const ulInit = { clipPath: 'inset(10% 50% 90% 50% round 10px)' };
const ulTransition = { type: 'spring', bounce: 0, duration: 0.5 };
//////////////////////////   LI   ///////////////////////////////////////
const liAnimate = { opacity: 1, scale: 1, filter: 'blur(0px)' };
const liInit = { opacity: 0, scale: 0.3, filter: 'blur(20px)' };
//////////////////////////////////////////////////////////////////////

const Select: FC<IProps> = ({ onChange, options, value }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const onClickOption = (text: string) => {
    onChange(text);
    onClose();
  };

  useOnClickOutside(ref, onClose);

  return (
    <div className={[s.menu, isOpen ? s.active : ''].join(' ')} ref={ref}>
      <motion.div
        className={s.title}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            animate={isOpen ? ulAnimate : ulInit}
            initial={ulInit}
            exit={ulInit}
            transition={ulTransition}
            className={s.list}
            style={{
              pointerEvents: isOpen ? 'auto' : 'none',
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
            }}
          >
            {options.map((text, inx) => (
              <motion.li
                className={s.listOption}
                animate={isOpen ? liAnimate : liInit}
                initial={liInit}
                transition={{
                  duration: 0.1,
                  delay: inx * 0.1,
                }}
                onClick={() => onClickOption(text)}
                key={text}
              >
                {text}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(Select);
