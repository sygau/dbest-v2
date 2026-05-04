// Phase 4 Cleanup: Kept only data exports and metadata utilities
// All generate* functions deprecated - use PageSEO component with subjectKey/pageKey props instead
// See data/legacy/structured-data.ts for deprecated data structures

import {
  PageMetadata,
  subjectMetadata,
  mainPagesMetadata,
  getPageMetadata,
  getSubjectMetadata,
  getMainPageMetadata
} from './pageMetadata';

// Re-export for convenience
export type { PageMetadata };
export { 
  subjectMetadata, 
  mainPagesMetadata,
  getPageMetadata, 
  getSubjectMetadata, 
  getMainPageMetadata 
};

// Legacy data exports - kept for backward compatibility
// Data is now primarily managed in data/legacy/ and data/jsonld/, data/faqs/
export { subjectData, pageData } from '../data/legacy/structured-data';
export type { SubjectData, PageData } from '../data/legacy/structured-data';
