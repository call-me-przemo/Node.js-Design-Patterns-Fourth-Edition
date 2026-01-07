import { Crime } from "./create-read-record";

export class CrimesAggregator {
  static aggregateCrimesPerYear(crime: Crime, crimes: CrimesPerYear) {
    const currCrime = crimes.find(({ year }) => year === crime.year);

    if (currCrime) {
      currCrime.value += crime.value;
    } else {
      crimes.push({ year: crime.year, value: crime.value });
    }
  }

  static aggregateCrimesPerArea(crime: Crime, crimes: CrimesPerArea) {
    const area = crimes.find(({ borough }) => borough === crime.borough);

    if (area) {
      const category = area.crimes.find(
        ({ majorCategory }) => majorCategory === crime.majorCategory,
      );

      category
        ? (category.value += crime.value)
        : area.crimes.push({
            majorCategory: crime.majorCategory,
            value: crime.value,
          });
    } else {
      crimes.push({
        borough: crime.borough,
        crimes: [{ majorCategory: crime.majorCategory, value: crime.value }],
      });
    }
  }
}

export type CrimesPerYear = Array<Pick<Crime, "year" | "value">>;

export type CrimesPerArea = Array<{
  borough: Crime["borough"];
  crimes: [
    {
      majorCategory: Crime["majorCategory"];
      value: Crime["value"];
    },
  ];
}>;
