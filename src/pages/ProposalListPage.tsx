import React, { FC, useEffect, useState } from 'react';
import { IProposal } from "../types/types";
import dataset from '../data'
import List from "../components/List";
import ProposalItem from "../components/ProposalItem";
import classes from './ProposalListPage.module.css'

const ProposalListPage: FC = () => {
  const [proposalList, setProposalList] = useState<IProposal[]>([]);

  useEffect(() => {
    setProposalList(dataset);
  }, [])

  return (
    <List className={classes.proposal_list} items={proposalList}
          renderItem={(proposal: IProposal) => <ProposalItem proposal={proposal}/>}/>
  );
};

export default ProposalListPage;
