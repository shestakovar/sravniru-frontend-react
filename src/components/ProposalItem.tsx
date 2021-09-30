import React, { FC } from 'react';
import { IProposal } from '../types/types';
import classes from './ProposalItem.module.css';
import { convertCurrency, convertTime } from "../utils/print";
import MyButton from "./UI/MyButton/MyButton";
import { useHistory } from "react-router-dom";

interface ProposalItemProps {
  proposal: IProposal;
}

const ProposalItem: FC<ProposalItemProps> = ({ proposal }) => {
  const history = useHistory();
  return (
    <div className={classes.proposal_item}>
      <div className={`${classes.proposal_item__col}`}>
        <div className={`${classes.img__wrapper}`}>
          <img className={classes.responsive_image} src={proposal.organization.logo} alt={proposal.organization.name}
               title={proposal.organization.name}/>
        </div>
      </div>
      <div className={`info__wrapper ${classes.proposal_item__col}`}>
        <div className={`info__percent ${classes.title} ${classes.proposal_item__col_item}`}>
          {proposal.rate.periods[0].rate.from === proposal.rate.periods[0].rate.to
            ? proposal.rate.periods[0].rate.from + '%'
            : 'от ' + proposal.rate.periods[0].rate.from + '%'
          }
        </div>
        <div className={`info__name ${classes.subtitle} ${classes.proposal_item__col_item}`}>
          «{proposal.name}»
        </div>
      </div>
      <div className={`${classes.cost__wrapper} ${classes.proposal_item__col}`}>
        <div className={`cost__amount ${classes.title} ${classes.proposal_item__col_item}`}>
          {proposal.rate.creditAmount?.to
            ? `${proposal.rate.creditAmount.from.toLocaleString()}  ${convertCurrency(proposal.rate.currency)} – ${proposal.rate.creditAmount.to.toLocaleString()} ${convertCurrency(proposal.rate.currency)}`
            : `от ${proposal.rate.creditAmount.from.toLocaleString()} ${convertCurrency(proposal.rate.currency)}`
          }
        </div>
        <div className={`cost__term ${classes.subtitle} ${classes.proposal_item__col_item}`}>
          На срок до {convertTime(proposal.rate.periods[0].term.to, proposal.rate.periods[0].termUnit)}
        </div>
      </div>
      <div className={`conditions__wrapper ${classes.proposal_item__col}`}>
        <div className={`conditions__age ${classes.subtitle} ${classes.proposal_item__col_item}`}>
          Возраст от {proposal.customerRequirements.age} года
        </div>
        <div className={`conditions__experience ${classes.subtitle} ${classes.proposal_item__col_item}`}>
          Стаж от {proposal.customerRequirements.lastExperience} месяцев
        </div>
        <div className={`conditions__documents ${classes.subtitle} ${classes.proposal_item__col_item}`}>
          {proposal.customerRequirements.documents} документа
        </div>
      </div>
      <div className={`${classes.more__wrapper} ${classes.proposal_item__col}`}>
        <div className={`${classes.more__license_num} ${classes.proposal_item__col_item}`}>
          лиц. № {proposal.organization.license}
        </div>
        <MyButton className={`${classes.proposal_item__col_item}`} text="Подробнее" onClick={() => history.push(`/${proposal.id}`)}/>
      </div>
    </div>
  );
};

export default ProposalItem;
