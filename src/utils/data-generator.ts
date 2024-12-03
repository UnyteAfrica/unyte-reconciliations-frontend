import {
  Affiliate,
  affiliateTypes,
  BasePolicy,
  policyCategories,
} from "@/types/types";
import { faker } from "@faker-js/faker";

export const generateRandomAffiliate = (): Affiliate => {
  const affiliate: Partial<Affiliate> = {
    id: faker.string.nanoid(8),
    type: faker.helpers.arrayElement(affiliateTypes),
  };
  if (affiliate["type"] == "Agent")
    affiliate["name"] = affiliate["name"] = faker.person.fullName();
  if (affiliate["type"] == "Merchant") affiliate["name"] = faker.company.name();
  return affiliate as Affiliate;
};

const generateRandomBasePolicy = (affiliate: Affiliate): BasePolicy => {
  const policy = {
    premium: Number(faker.commerce.price({ min: 1000, max: 100000 })),
    date: faker.date
      .between({
        from: new Date(2015, 0, 1, 1),
        to: new Date(),
      })
      .toISOString(),
    policyNo: faker.string.nanoid(8),
    policyCategory: faker.helpers.arrayElement(policyCategories.slice(1)),
    affiliate,
  };
  return policy;
};

export const generateRandomBasePolicies = (
  num: number,
  affiliates: Affiliate[]
): BasePolicy[] => {
  return new Array(num)
    .fill(0)
    .map(() => generateRandomBasePolicy(faker.helpers.arrayElement(affiliates)))
    .sort((policyA, policyB) => {
      if (policyA.date < policyB.date) return 1;
      if (policyA.date > policyB.date) return -1;

      return 0;
    });
};

export const groupArrayElems = <T>(
  list: Array<T>,
  groupCount: number
): Record<number, T[]> => {
  let currPage = 1;
  const result: Record<number, T[]> = {};

  for (let i = 0; i < list.length; i += groupCount) {
    result[currPage] = list.slice(i, i + groupCount);
    currPage += 1;
  }
  return result;
};
