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
import { IParsed, parseLocation } from "../utils/url";
import ProposalFilter, { IFilter } from "../components/ProposalFilter";

const ProposalListPage: FC = () => {
  const [proposalList, setProposalList] = useState<IProposal[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const history = useHistory();
  const location = useLocation();
  const querySort = parseLocation<IParsed>(location.search, ['sort']).sort;
  const [filter, setFilter] = useState<IFilter>({ creditAmount: '', initialAmount: '', term: '' })
  const loadedAll = useTypedSelector(state => state.isLoadedAll);
  const dispatch = useTypedDispatch()
  const fetchProposals = async (limit: number, offset: number, sort: string, filters: IFilter) => {
    const response = await ProposalService.getProposalList(limit, offset, sort, filters.term, filters.initialAmount, filters.creditAmount);
    setProposalList(oldState => [...oldState, ...response.results]);
  }

  const loadMore = () => {
    fetchProposals(0, limit, querySort, filter);
    dispatch(setMoreLoaded());
  }

  const sort = (sortby: string) => {
    const query = new URLSearchParams(location.search);
    if (sortby)
      query.set('sort', sortby);
    history.push('?' + query);
  }

  useEffect(() => {
    setProposalList([]);

    const tempObj = parseLocation<IFilter>(location.search, ['creditAmount', 'initialAmount', 'term']);
    setFilter(tempObj);

    if (loadedAll)
      fetchProposals(0, 0, querySort, tempObj);
    else
      fetchProposals(limit, 0, querySort, tempObj);
  }, [limit, location.search]);

  return (
    <>
      <div className={classes.filter_wrapper}>
        <ProposalFilter filter={filter} setFilter={setFilter}/>
      </div>
      <div className={classes.list_wrapper}>

        <div className={classes.sort__wrapper}>Сортировать:
          <div className={classes.sort_options__wrapper}>
            <a className={`${classes.sort_link} ${querySort === 'rate' ? classes.active : classes.noactive}`}
               onClick={() => sort('rate')}>по
              ставке</a>

            <a className={`${classes.sort_link} ${querySort === 'sum' ? classes.active : classes.noactive}`}
               onClick={() => sort('sum')}>по
              сумме</a>
          </div>
        </div>
        <List className={classes.proposal_list} items={proposalList}
              renderItem={(proposal: IProposal) => <ProposalItem proposal={proposal} key={proposal.id}/>}/>
        {!loadedAll && proposalList.length > 0 &&
        <MyButton text='Загрузить остальные' onClick={loadMore} className={classes.load_button}/>}
      </div>
    </>
  );
};

export default ProposalListPage;
