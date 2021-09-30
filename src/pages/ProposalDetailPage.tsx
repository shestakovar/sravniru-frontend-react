import React, { FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { IProposal } from "../types/types";
import ProposalService from "../services/ProposalService";
import ProposalDetail from "../components/ProposalDetail";

interface params {
  id: string;
}

const ProposalDetailPage: FC = () => {
  const params = useParams<params>();
  const id = parseInt(params.id);
  const [proposal, setProposal] = useState<IProposal>()

  const fetchProposal = async () => {
    const response = await ProposalService.getProposal(id);
    setProposal(response);
  }

  useEffect(() => {
    fetchProposal();
  }, [id])
  return (
    <div>
      {proposal && <ProposalDetail proposal={proposal}/>}
    </div>
  );
};

export default ProposalDetailPage;
