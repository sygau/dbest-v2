export interface ChangelogEntry {
  date: string;
  changes: string[];
}

export const changelogData: ChangelogEntry = {
  date: "1/3/2026",
  changes: [
    "Added new IR prep tool instead of revising my dse",
    "Claude slop cleanup"
  ]
};