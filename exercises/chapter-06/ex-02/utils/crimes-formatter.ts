import { CrimesPerArea } from ".";

export class CrimesFormatter {
  static formatCrimesPerAreaValues(crimesPerArea: CrimesPerArea) {
    return crimesPerArea
      .map(({ borough, crimes }) => ({
        borough,
        value: crimes.reduce((acc, { value }) => (acc += value), 0),
      }))
      .sort((a, b) => b.value - a.value);
  }

  static formatMostCommonCrimePerArea(crimesPerArea: CrimesPerArea) {
    return crimesPerArea
      .map(({ borough, crimes }) => ({
        borough,
        ...crimes.reduce((acc, crime) =>
          crime.value > acc.value ? crime : acc,
        ),
      }))
      .sort((a, b) => a.borough.localeCompare(b.borough));
  }

  static formatLeastCommonCrimePerArea(crimesPerArea: CrimesPerArea) {
    return crimesPerArea
      .map(({ borough, crimes }) => ({
        borough,
        ...crimes.reduce((acc, crime) =>
          crime.value < acc.value ? crime : acc,
        ),
      }))
      .sort((a, b) => a.borough.localeCompare(b.borough));
  }
}
