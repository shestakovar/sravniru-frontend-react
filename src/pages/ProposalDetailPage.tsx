import React, { FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { IProposal } from "../types/types";
import dataset from '../data'
import ProposalDetail from "../components/ProposalDetail";

interface params {
  id: string;
}

const ProposalDetailPage: FC = () => {
  const params = useParams<params>();
  const id = parseInt(params.id);
  const [proposal, setProposal] = useState<IProposal>()

  useEffect(() => {
    setProposal(dataset[id]);
  }, [id])
  return (
    <div>
      {proposal && <ProposalDetail proposal={proposal} />}
    </div>
  );
};

export default ProposalDetailPage;