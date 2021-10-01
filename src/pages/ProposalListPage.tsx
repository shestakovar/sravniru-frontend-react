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

  const loadMore = () => {
    fetchProposals(0, limit, querySort);
    dispatch(setMoreLoaded());
  }

  const sort = (sortby: string) => {
    dispatch(setMoreUnloaded());
    history.push(`?sort=${sortby}`);
  }

  useEffect(() => {
    setProposalList([]);
    if (loadedAll)
      fetchProposals(0, 0, querySort);
    else
      fetchProposals(limit, 0, querySort);
  }, [limit, querySort]);


  if (proposalList.length === 0)
    return null;

  return (
    <div className={classes.whole_page}>
      <div className={classes.sort__wrapper}>Сортировать:
        <span> </span>
        <a className={`${classes.sort_link} ${querySort === 'rate' ? classes.active : classes.noactive}`}
           onClick={() => sort('rate')}>по
          ставке</a>
        <span> </span>
        <a className={`${classes.sort_link} ${querySort === 'sum' ? classes.active : classes.noactive}`}
           onClick={() => sort('sum')}>по
          сумме</a>
      </div>
      <List className={classes.proposal_list} items={proposalList}
            renderItem={(proposal: IProposal) => <ProposalItem proposal={proposal} key={proposal.id}/>}/>
      {!loadedAll && <MyButton text='Загрузить остальные' onClick={loadMore} className={classes.load_button}/>}
    </div>
  );
};

export default ProposalListPage;
