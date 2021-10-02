import React, { FC } from 'react';
import classes from './MyButton.module.css'

interface MyBtnProps {
  text: string
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const MyButton: FC<MyBtnProps> = ({ text, className, onClick }) => {
  return (
    <button className={`${classes.MyButton} ${className}`} onClick={onClick}>{text}</button>
  );
};

export default MyButton;
