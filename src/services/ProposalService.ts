import { instance } from "../api";
import { IProposal } from "../types/types";

interface paginatedProposalList {
  count: number;
  next: string;
  previous: string;
  results: IProposal[];
}

export default class ProposalService {
  static async getProposalList(limit: number = 10, page: number = 0) {
    const offset = page * limit;
    const proposals = await instance.get<paginatedProposalList>(`/proposals/`, {
      params: { limit, offset }
    });
    return proposals.data;
  }

  static async getProposal(id: number) {
    const proposal = await instance.get<IProposal>(`/proposals/${id}`);
    return proposal.data;
  }
}
