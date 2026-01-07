import { resolve } from "node:path";
import {
  CrimesAggregator,
  CrimesFormatter,
  CrimesPerArea,
  CrimesPerYear,
  createReadRecord,
  logCrimes,
} from "./utils";

const crimesPerYear: CrimesPerYear = [];
const crimesPerArea: CrimesPerArea = [];
const filename = resolve("london_crime_by_lsoa.csv");
const recordStream = createReadRecord(filename);

for await (const crime of recordStream) {
  CrimesAggregator.aggregateCrimesPerYear(crime, crimesPerYear);
  CrimesAggregator.aggregateCrimesPerArea(crime, crimesPerArea);
}

crimesPerYear.sort((a, b) => a.year - b.year);
const crimesPerAreaValues =
  CrimesFormatter.formatCrimesPerAreaValues(crimesPerArea);
const mostCommonCrimePerArea =
  CrimesFormatter.formatMostCommonCrimePerArea(crimesPerArea);
const leastCommonCrimePerArea =
  CrimesFormatter.formatLeastCommonCrimePerArea(crimesPerArea);

logCrimes("Crimes per year", crimesPerYear);
logCrimes("Crimes per area values", crimesPerAreaValues);
logCrimes("Most common crime per area", mostCommonCrimePerArea);
logCrimes("Least common crime per area", leastCommonCrimePerArea);
