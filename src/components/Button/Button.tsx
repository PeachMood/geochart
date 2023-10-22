import { type FC } from 'react';

import { type ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button: FC<ButtonProps> = ({ color }) => {
  return <button className={styles.button} style={{ backgroundColor: color }} />;
};

export default Button;
