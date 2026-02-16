export interface ChangelogEntry {
  date: string;
  changes: string[];
}

export const changelogData: ChangelogEntry = {
  date: "1/1/2026",
  changes: [
    "Fixed DSE countdown timer timestamp",
    "Fixed some styling issues"
  ]
};