import React, { FC, useEffect, useState } from 'react';
import { IProposal } from "../types/types";
import classes from './ProposalListPage.module.css'
import ProposalService from "../services/ProposalService";
import { getPagesCount } from "../utils/pages";
import List from "../components/List";
import ProposalItem from "../components/ProposalItem";
import MyButton from "../components/UI/MyButton/MyButton";

const ProposalListPage: FC = () => {
  const [proposalList, setProposalList] = useState<IProposal[]>([]);
  const [countPages, setCountPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const fetchProposals = async () => {
    const response = await ProposalService.getProposalList(limit, page);
    setProposalList([...proposalList, ...response.results]);
    const count = response.count;
    setCountPages(getPagesCount(count, limit));
  }

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <>
      <List className={classes.proposal_list} items={proposalList}
            renderItem={(proposal: IProposal) => <ProposalItem proposal={proposal} key={proposal.id}/>}/>
      <MyButton text='Загрузить еще'/>
    </>
  );
};

export default ProposalListPage;
