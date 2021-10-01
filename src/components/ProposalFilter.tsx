import React, { FC, useEffect, useState } from 'react';
import MyButton from "./UI/MyButton/MyButton";
import { useHistory, useLocation } from "react-router-dom";
import classes from './ProposalFilter.module.css'

export interface IFilter {
  creditAmount: string;
  initialAmount: string;
  term: string;
}

interface Props {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>
}

const ProposalFilter: FC<Props> = ({ filter, setFilter }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {

  }, [location.search])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = new URLSearchParams(location.search);
    if (filter.creditAmount)
      query.set('creditAmount', filter.creditAmount);
    else
      query.delete('creditAmount')
    if (filter.initialAmount)
      query.set('initialAmount', filter.initialAmount);
    else
      query.delete('initialAmount')
    if (filter.term)
      query.set('term', filter.term);
    else
      query.delete('term')
    history.push('?' + query);
  }
  return (
    <div>
      <h1 className={classes.header}>Ипотечный калькулятор</h1>
      <form onSubmit={submit} className={classes.form}>
        <div className={classes.form_group}>
          <label htmlFor="cost" className={classes.input_label}>Стоимость недвижимости</label>
          <input id="cost" className={classes.input} type="number" value={filter.creditAmount} onChange={ e => setFilter({...filter, creditAmount: e.target.value})}/>
        </div>
        <div className={classes.form_group}>
          <label htmlFor="initial" className={classes.input_label}>Первоначальный взнос</label>
          <input id="initial" className={classes.input} type="number" value={filter.initialAmount} onChange={ e => setFilter({...filter, initialAmount: e.target.value})}/>
        </div>
        <div className={classes.form_group}>
          <label htmlFor="term" className={classes.input_label}>Срок</label>
          <select id="term" className={classes.input} value={filter.term} onChange={ e => setFilter({...filter, term: e.target.value})}>
            <option value="">Любой</option>
            <option value="12">1 год</option>
            <option value="24">2 года</option>
            <option value="36">3 года</option>
            <option value="48">4 года</option>
            <option value="60">5 лет</option>
            <option value="72">6 лет</option>
            <option value="84">7 лет</option>
            <option value="96">8 лет</option>
            <option value="108">9 лет</option>
            <option value="120">10 лет</option>
            <option value="144">12 лет</option>
            <option value="180">15 лет</option>
            <option value="240">20 лет</option>
            <option value="300">25 лет</option>
            <option value="360">30 лет</option>
          </select>

        </div>
        <div className={classes.form_group}>
          <MyButton className={classes.input} text="Показать"/>
        </div>
      </form>
    </div>
  );
};

export default ProposalFilter;