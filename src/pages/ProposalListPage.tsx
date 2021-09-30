import React, { FC, useEffect, useState } from 'react';
import { IProposal } from "../types/types";
import classes from './ProposalListPage.module.css'
import ProposalService from "../services/ProposalService";
import List from "../components/List";
import ProposalItem from "../components/ProposalItem";
import MyButton from "../components/UI/MyButton/MyButton";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { setMoreLoaded, setMoreUnloaded } from "../store/action-creators/app.action";
import { useHistory, useLocation } from "react-router-dom";
import { parseLocation } from "../utils/url";

const ProposalListPage: FC = () => {
  const [proposalList, setProposalList] = useState<IProposal[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const history = useHistory();
  const location = useLocation();
  const querySort = parseLocation(location.search, ['sort']).sort;
  const loadedAll = useTypedSelector(state => state.isLoadedAll);
  const dispatch = useTypedDispatch()

  const fetchProposals = async (limit: number, offset: number, sort: string) => {
    const response = await ProposalService.getProposalList(limit, offset, sort);
    setProposalList(oldState => [...oldState, ...response.results]);
  }

  const loadAll = () => {
    fetchProposals(0, limit, querySort);
    dispatch(setMoreLoaded());
  }

  const sort = (sortby: string) => {
    dispatch(setMoreUnloaded());
    history.push(`?sort=${sortby}`);
  }

  useEffect(() => {
    setProposalList([]);
    fetchProposals(limit, 0, querySort);
    if (loadedAll)
      fetchProposals(0, limit, querySort);
  }, [limit, querySort]);

  if (proposalList.length === 0)
    return null;

  return (
    <>
      <MyButton text='По ставке' onClick={() => sort('rate')}/>
      <MyButton text='По сумме' onClick={() => sort('sum')}/>
      <List className={classes.proposal_list} items={proposalList}
            renderItem={(proposal: IProposal) => <ProposalItem proposal={proposal} key={proposal.id}/>}/>
      {!loadedAll && <MyButton text='Загрузить остальные' onClick={loadAll}/>}
    </>
  );
};

export default ProposalListPage;
