import { instance } from "../api";
import { IProposal } from "../types/types";

interface paginatedProposalList {
  count: number;
  next: string;
  previous: string;
  results: IProposal[];
}

export default class ProposalService {
  static async getProposalList(limit: number = 10, offset: number = 0, sort?: string) {
    const proposals = await instance.get<paginatedProposalList>(`/proposals/`, {
      params: { limit, offset, sort }
    });
    return proposals.data;
  }

  static async getProposalListPage(limit: number, page: number) {
    const offset = page * limit;
    return this.getProposalList(limit, offset);
  }

  static async getProposal(id: number) {
    const proposal = await instance.get<IProposal>(`/proposals/${id}`);
    return proposal.data;
  }
}
