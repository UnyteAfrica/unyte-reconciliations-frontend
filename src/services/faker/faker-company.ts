import { Affiliate, BasePolicy, Filter, PolicyCategory } from "@/types/types";
import {
  generateRandomAffiliate,
  generateRandomBasePolicies,
  groupArrayElems,
} from "@/utils/data-generator";
import { delay } from "@/utils/utils";

const ITEMS_TO_GENERATE = 108;

type AffiliateType = "agent" | "merchant";

export class CompanyFaker {
  groupedPolicies: Record<number, BasePolicy[]>;
  policies: BasePolicy[];
  filteredPolicies: BasePolicy[];
  totalItems: number = 0;
  earliestPolicyDate: Date = new Date();
  latestPolicyDate: Date = new Date();
  minPolicyPremium: number = Number.MAX_SAFE_INTEGER;
  maxPolicyPremium: number = 0;
  affiliatesMap: Record<AffiliateType, Affiliate[]>;

  private static instance: CompanyFaker;

  private constructor() {
    const randomAffiliates = new Array(10).fill(0).map(generateRandomAffiliate);
    this.policies = this.filteredPolicies = generateRandomBasePolicies(
      ITEMS_TO_GENERATE,
      randomAffiliates
    );
    this.groupedPolicies = groupArrayElems(this.filteredPolicies, 10);
    this.affiliatesMap = this.groupAffiliates(randomAffiliates);
    this.updateStats();
  }

  static getInstance() {
    if (!this.instance) this.instance = new CompanyFaker();
    return this.instance;
  }

  updateStats() {
    this.totalItems = this.filteredPolicies.length;
    this.earliestPolicyDate = new Date(
      this.filteredPolicies.length
        ? this.filteredPolicies.at(-1)!.date
        : new Date()
    );
    this.latestPolicyDate = new Date(
      this.filteredPolicies.length
        ? this.filteredPolicies.at(0)!.date
        : new Date()
    );
    for (let policy of this.filteredPolicies) {
      this.minPolicyPremium = Math.min(this.minPolicyPremium, policy.premium);
      this.maxPolicyPremium = Math.max(this.maxPolicyPremium, policy.premium);
    }
  }

  filterPolicies = (filter: Filter) => {
    let hasSelectedPolicyCategories = false;
    for (let key in filter.selectedPolicyCategories) {
      if (filter.selectedPolicyCategories[key as PolicyCategory]) {
        hasSelectedPolicyCategories = true;
        break;
      }
    }
    this.filteredPolicies = this.policies.filter((policy) => {
      if (filter.startDate && new Date(policy.date) < filter.startDate)
        return false;
      if (filter.endDate && new Date(policy.date) > filter.endDate)
        return false;
      if (filter.minAmount && policy.premium < Number(filter.minAmount))
        return false;
      if (filter.maxAmount && policy.premium > Number(filter.maxAmount))
        return false;
      if (
        filter.selectedPolicyCategories &&
        hasSelectedPolicyCategories &&
        !filter.selectedPolicyCategories[policy.policyCategory]
      )
        return false;
      return true;
    });
    this.updateStats();
    this.groupedPolicies = groupArrayElems(this.filteredPolicies, 10);
  };

  getPolicies(filter?: Filter) {
    if (filter) {
      this.filterPolicies(filter);
    }
    return delay(() => this.filteredPolicies, 1);
  }

  getPaginatedPolicies(page: number) {
    return delay(() => this.groupedPolicies[page], 1);
  }

  groupAffiliates(affiliates: Affiliate[]): Record<AffiliateType, Affiliate[]> {
    const result: Record<AffiliateType, Affiliate[]> = {
      agent: [],
      merchant: [],
    };
    for (let affiliate of affiliates) {
      result[affiliate.type.toLowerCase() as AffiliateType].push(affiliate);
    }

    return result;
  }
}
