interface IOrganization {
  id: number; //Incompatible with origin dataset
  name: string;
  license: string;
  logo: string;
}

interface ICustomerRequirements {
  documents: number;
  age: number;
  manAgeAtRepayment: number;
  femaleAgeAtRepayment: number;
  lastExperience: number;
  fullExperience: number;
  salary: number;
}

interface IFromTo {
  from: number;
  to: number;
}

interface IFromMaybeTo {
  from: number;
  to?: number;
}

interface IPeriod {
  id: number; //Incompatible with origin dataset
  rate: IFromTo;
  termUnit: string;
  term: IFromTo;
  isFloatingRate: boolean;
}

interface IRate {
  periods: IPeriod[];
  currency: string;
  creditAmount: IFromMaybeTo;
  initialAmount: IFromMaybeTo;
}

export interface IProposal {
  id: number; //Incompatible with origin dataset
  name: string;
  alias: string;
  organization: IOrganization;
  customerRequirements: ICustomerRequirements;
  rate: IRate;
}
