import React, { FC, useState } from 'react';
import { IProposal } from "../types/types";

import dataset from '../data'

const ProposalListPage: FC = () => {
  const [proposalList, setProposalList] = useState<IProposal[]>(dataset);
  return (
    <div>

    </div>
  );
};

export default ProposalListPage;