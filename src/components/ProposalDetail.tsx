import React, { FC } from 'react';
import { IProposal } from "../types/types";
import { convertCurrency, convertTime } from "../utils/print";
import MyButton from "./UI/MyButton/MyButton";

interface ProposalDetailProps {
  proposal: IProposal
}

const ProposalDetail: FC<ProposalDetailProps> = ({ proposal }) => {
  return (
    <div>
      <h1>Название предложения: {proposal.name}</h1>
      <h2>Банк: {proposal.organization.name}. Номер лицензии: {proposal.organization.license}</h2>

      <div>
        <h2>Требования к получателю кредита:</h2>
        <div>Возраст: {proposal.customerRequirements.age}</div>
        <div>Количество документов: {proposal.customerRequirements.documents}</div>
        <div>Возраст(М): {proposal.customerRequirements.manAgeAtRepayment}</div>
        <div>Возраст(Ж): {proposal.customerRequirements.femaleAgeAtRepayment}</div>
      </div>

      <div>
        <h2>Сумма: </h2>
        <span>
          {proposal.rate.creditAmount?.to
            ? `${proposal.rate.creditAmount.from.toLocaleString()}  ${convertCurrency(proposal.rate.currency)} – ${proposal.rate.creditAmount.to.toLocaleString()} ${convertCurrency(proposal.rate.currency)}`
            : `от ${proposal.rate.creditAmount.from.toLocaleString()} ${convertCurrency(proposal.rate.currency)}`
          }
        </span>
      </div>

      <div>
        <h2>Процент:</h2>
        <span>
          {proposal.rate.periods[0].rate.from === proposal.rate.periods[0].rate.to
            ? proposal.rate.periods[0].rate.from + '%'
            : 'от ' + proposal.rate.periods[0].rate.from + '%'
          }
        </span>
      </div>

      <div>
        <h2>Срок: </h2>
        <span>
          От {convertTime(proposal.rate.periods[0].term.from, proposal.rate.periods[0].termUnit)} до {convertTime(proposal.rate.periods[0].term.to, proposal.rate.periods[0].termUnit)}
        </span>
      </div>

      <div>
        <MyButton text='Перейти на сайт' />
      </div>



    </div>
  );
};

export default ProposalDetail;
