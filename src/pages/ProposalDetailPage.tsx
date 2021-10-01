import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { IProposal } from "../types/types";
import ProposalService from "../services/ProposalService";
import ProposalDetail from "../components/ProposalDetail";
import classes from './ProposalDetailPage.module.css'
import MyButton from "../components/UI/MyButton/MyButton";

interface params {
  id: string;
}

const ProposalDetailPage: FC = () => {
  const params = useParams<params>();
  const id = parseInt(params.id);
  const [proposal, setProposal] = useState<IProposal>();
  const history = useHistory();

  const fetchProposal = async () => {
    const response = await ProposalService.getProposal(id);
    setProposal(response);
  }

  useEffect(() => {
    fetchProposal();
  }, [id])
  return (
    <div className={classes.whole_page}>
      <MyButton className={classes.btn} text='< Назад' onClick={history.goBack}/>
      {proposal && <ProposalDetail proposal={proposal}/>}
    </div>
  );
};

export default ProposalDetailPage;
