export const convertCurrency = (str: string) => {
  if (str == 'RUB') {
    return '₽';
  }
  else {
    console.log('incorrect currency');
    return 'РР';
  }
}

// На срок до ...
const getYearString = (years: number) => {
  years = Math.trunc(years);
  if (years % 10 === 1 && years !== 11)
    return 'года';
  else
    return 'лет';
}

const getMonthsString = (months: number) => {
  months = Math.trunc(months);
  if (months % 10 === 1 && months !== 11)
    return 'месяца';
  else
    return 'месяцев';
}

export const convertTime = (count: number, period: string) => {
  if (period == 'year') {
    return `${count} ${getYearString(count)}`;
  }
  if (period == 'month') {
    if (count >= 12 && count % 6 === 0)
      return `${count/12} ${getYearString(count/12)}`;
    else
      return `${count} ${getMonthsString(count)}`;
  }
  else {
    console.log('incorrect time')
    return `${count} ${period}`
  }
}