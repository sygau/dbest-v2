import lastUpdatedData from '../data/lastUpdated.json';

interface LastUpdatedData {
  subjects: {
    [subject: string]: {
      index: string;
      yearSlug: string;
    };
  };
  other: {
    [page: string]: string;
  };
}

// Load the last updated data
const data: LastUpdatedData = lastUpdatedData as LastUpdatedData;

/**
 * Get the last updated date for a subject index page
 * @param subject - The subject key (e.g., 'bafs', 'biology', etc.)
 * @returns The last updated date in dd/mm/yyyy format
 */
export function getSubjectIndexLastUpdated(subject: string): string {
  return data.subjects[subject]?.index || '12/8/2025';
}

/**
 * Get the last updated date for a subject year slug page
 * @param subject - The subject key (e.g., 'bafs', 'biology', etc.)
 * @returns The last updated date in dd/mm/yyyy format
 */
export function getSubjectYearSlugLastUpdated(subject: string): string {
  return data.subjects[subject]?.yearSlug || '12/8/2025';
}

/**
 * Get the last updated date for other pages (cutoff, citizen, etc.)
 * @param page - The page key (e.g., 'cutoff', 'citizen')
 * @returns The last updated date in dd/mm/yyyy format
 */
export function getOtherPageLastUpdated(page: string): string {
  return data.other[page] || '12/8/2025';
}

/**
 * Get all available subjects
 * @returns Array of subject keys
 */
export function getAvailableSubjects(): string[] {
  return Object.keys(data.subjects);
}

/**
 * Get all available other pages
 * @returns Array of page keys
 */
export function getAvailableOtherPages(): string[] {
  return Object.keys(data.other);
}

/**
 * Update the last updated date for a subject index page
 * Note: This function is for future use with a more sophisticated update system
 * @param subject - The subject key
 * @param date - The new date in dd/mm/yyyy format
 */
export function updateSubjectIndexLastUpdated(subject: string, date: string): void {
  if (data.subjects[subject]) {
    data.subjects[subject].index = date;
  }
}

/**
 * Update the last updated date for a subject year slug page
 * Note: This function is for future use with a more sophisticated update system
 * @param subject - The subject key
 * @param date - The new date in dd/mm/yyyy format
 */
export function updateSubjectYearSlugLastUpdated(subject: string, date: string): void {
  if (data.subjects[subject]) {
    data.subjects[subject].yearSlug = date;
  }
} 