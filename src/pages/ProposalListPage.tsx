import React, { FC, useEffect, useState } from 'react';
import { IProposal } from "../types/types";
import classes from './ProposalListPage.module.css'
import ProposalService from "../services/ProposalService";
import List from "../components/List";
import ProposalItem from "../components/ProposalItem";
import MyButton from "../components/UI/MyButton/MyButton";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { setAppLoaded } from "../store/action-creators/app.action";

const ProposalListPage: FC = () => {
  const [proposalList, setProposalList] = useState<IProposal[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const loadedAll = useTypedSelector(state => state.isLoadedAll);
  const dispatch = useTypedDispatch()

  const fetchProposals = async (limit: number, offset: number) => {
    const response = await ProposalService.getProposalList(limit, offset);
    setProposalList(oldState => [...oldState, ...response.results]);
  }

  const loadAll = () => {
    fetchProposals(0, limit);
    dispatch(setAppLoaded());
  }

  useEffect(() => {
    fetchProposals(limit, 0);
    if (loadedAll)
      fetchProposals(0, limit);
  }, [limit]);

  if (proposalList.length === 0)
    return null;

  return (
    <>
      <List className={classes.proposal_list} items={proposalList}
            renderItem={(proposal: IProposal) => <ProposalItem proposal={proposal} key={proposal.id}/>}/>
      {!loadedAll && <MyButton text='Загрузить остальные' onClick={loadAll}/>}
    </>
  );
};

export default ProposalListPage;
