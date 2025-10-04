export interface ChangelogEntry {
  date: string;
  changes: string[];
}

export const changelogData: ChangelogEntry = {
  date: "1/10/2025",
  changes: [
    "Removed past papers due to copyright infringement",
    "Remove mentions of dse life backup / dse.life references to stay clear of copyright infringement",
  ]
};