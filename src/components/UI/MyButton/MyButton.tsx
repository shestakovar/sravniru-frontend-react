import React, { FC } from 'react';
import classes from './MyButton.module.css'

interface MyBtnProps {
  text: string
  className?: string;
}

const MyButton: FC<MyBtnProps> = ( {text, className}) => {
  return (
    <button className={`${classes.MyButton} ${className}`}>{text}</button>
  );
};

export default MyButton;
