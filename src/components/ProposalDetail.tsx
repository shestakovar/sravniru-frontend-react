import React, { FC } from 'react';
import { IProposal } from "../types/types";
import { convertCurrency, convertTime } from "../utils/print";
import MyButton from "./UI/MyButton/MyButton";
import classes from './ProposalDetail.module.css'

interface ProposalDetailProps {
  proposal: IProposal
}

const ProposalDetail: FC<ProposalDetailProps> = ({ proposal }) => {
  return (
    <>
      <div className={classes.table_wrapper}>
        <table className={classes.table}>
          <tbody>
          <tr>
            <td>Название предложения</td>
            <td>{proposal.name}</td>
          </tr>
          <tr>
            <td>Банк</td>
            <td>{proposal.organization.name}</td>
          </tr>
          <tr>
            <td>Номер лицензии</td>
            <td>{proposal.organization.license}</td>
          </tr>
          <tr>
            <td>Сумма</td>
            <td>{proposal.rate.creditAmount?.to
              ? `${proposal.rate.creditAmount.from.toLocaleString()}${'\u00A0'}${convertCurrency(proposal.rate.currency)} – ${proposal.rate.creditAmount.to.toLocaleString()}${'\u00A0'}${convertCurrency(proposal.rate.currency)}`
              : `от ${proposal.rate.creditAmount.from.toLocaleString()}${'\u00A0'}${convertCurrency(proposal.rate.currency)}`
            }</td>
          </tr>

          <tr>
            <td>Первоначальный взнос</td>
            <td>{proposal.rate.initialAmount?.to
              ? `${proposal.rate.initialAmount.from.toLocaleString()}${'\u00A0'}% – ${proposal.rate.initialAmount.to.toLocaleString()}${'\u00A0'}%`
              : `от ${proposal.rate.initialAmount.from.toLocaleString()}${'\u00A0'}%`
            }</td>
          </tr>

          <tr>
            <td>Процент</td>
            <td>{proposal.rate.periods[0].rate.from === proposal.rate.periods[0].rate.to
              ? proposal.rate.periods[0].rate.from + '%'
              : 'от ' + proposal.rate.periods[0].rate.from + '%'
            }</td>
          </tr>

          <tr>
            <td>Срок</td>
            <td>От {convertTime(proposal.rate.periods[0].term.from, proposal.rate.periods[0].termUnit)} до {convertTime(proposal.rate.periods[0].term.to, proposal.rate.periods[0].termUnit)}</td>
          </tr>


          <tr className={classes.centered}>
            <td colSpan={2} className={classes.heading}>Требования к получателю кредита</td>
          </tr>
          <tr>
            <td>Возраст</td>
            <td>{proposal.customerRequirements.age}</td>
          </tr>
          <tr>
            <td>Количество документов</td>
            <td>{proposal.customerRequirements.documents}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colSpan={2}><MyButton text='Перейти на сайт' className={classes.button}/></td>
          </tr>

          </tfoot>
        </table>

      </div>
    </>
  );
};

export default ProposalDetail;
