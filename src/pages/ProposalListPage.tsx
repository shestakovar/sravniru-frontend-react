import React, { FC, useEffect, useState } from 'react';
import { IProposal } from "../types/types";
import classes from './ProposalListPage.module.css'
import ProposalService from "../services/ProposalService";
import List from "../components/List";
import ProposalItem from "../components/ProposalItem";
import MyButton from "../components/UI/MyButton/MyButton";

const ProposalListPage: FC = () => {
  const [proposalList, setProposalList] = useState<IProposal[]>([]);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);

  const fetchProposals = async (limit: number, offset: number) => {
    const response = await ProposalService.getProposalList(limit, offset);
    setProposalList([...proposalList, ...response.results]);
  }

  const loadAll = () => {
    fetchProposals(0, limit);
    setLoadedAll(true);
  }

  useEffect(() => {
    fetchProposals(limit, 0);
  }, [limit]);

  return (
    <>
      <List className={classes.proposal_list} items={proposalList}
            renderItem={(proposal: IProposal) => <ProposalItem proposal={proposal} key={proposal.id}/>}/>
      {!loadedAll && <MyButton text='Загрузить остальные' onClick={loadAll}/>}
    </>
  );
};

export default ProposalListPage;
