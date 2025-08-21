# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [!!!NEW CHANGES GO HERE!!!]



## [2.3.0] - 2025-8-22

### Added
- **View Counter System**: Implemented persistent Redis-based view counter for blog posts
  - New API endpoint: `api/view-count.js`
  - New React hook: `hooks/useViewCount.ts`
  - Session-based incrementing to prevent duplicate counts
  - Loading states and error handling
  - Integration with both blog index and individual blog posts
- **Enhanced Blog System**: Added view counts to blog listing page
  - Created reusable `BlogCard` component
  - Added view count display in blog meta section
  - Improved user experience with loading indicators
- **Centralized Metadata Management**: Created comprehensive metadata system
  - New file: `utils/pageMetadata.ts`
  - Centralized all page titles, descriptions, and OG tags
  - Added Chinese subject names to all subject pages
  - Removed "- dse.best" suffixes from all titles
- **TypeScript Path Mapping**: Enhanced TypeScript configuration
  - Added `@/data/*` path mapping to `tsconfig.json`
  - Updated imports to use absolute paths where appropriate

### Changed
- **FAQ Component**: Completely redesigned FAQ system
  - Removed Bootstrap accordion dependencies
  - Created custom accordion with theme-consistent styling
  - Fixed duplicate arrow icons issue
  - Fixed unreadable blue title color when activated
  - Minified CSS into single line for better performance
  - Added smooth animations and hover effects
- **Metadata Structure**: Reorganized page metadata
  - Moved citizen page from main pages to subject metadata
  - Updated all subject page titles to include Chinese names
  - Standardized metadata format across all pages
- **Import System**: Improved module imports
  - Updated to use absolute imports with `@/` alias
  - Fixed TypeScript import resolution issues
  - Moved FAQ data inline to fix Vercel build issues

### Fixed
- **Build Issues**: Resolved Vercel deployment problems
  - Fixed `Cannot find module '../data/faqData'` error
  - Fixed `Cannot find module '../../hooks/useViewCount'` error
  - Resolved TypeScript compilation issues
- **FAQ Styling**: Fixed visual issues in FAQ component
  - Eliminated duplicate chevron icons
  - Fixed title color consistency across themes
  - Improved accessibility and user experience
- **Metadata Consistency**: Fixed inconsistent page titles
  - Added missing Chinese subject names
  - Removed redundant "- dse.best" suffixes
  - Ensured proper SEO optimization

### Technical
- **Performance**: Optimized build times and bundle sizes
- **Code Quality**: Improved component architecture and reusability
- **TypeScript**: Enhanced type safety and import resolution
- **SEO**: Improved structured data and metadata management

---

## Template for Future Updates

## [Version] - YYYY-MM-DD

### Added
- New features or capabilities added
- New pages or components
- New API endpoints
- New dependencies

### Changed
- Changes in existing functionality
- Updates to existing components
- Changes in behavior or appearance
- Performance improvements

### Deprecated
- Features that will be removed in future versions
- Components or functions that are no longer recommended

### Removed
- Features or components that have been removed
- Dependencies that are no longer needed

### Fixed
- Bug fixes
- Build issues resolved
- TypeScript errors fixed
- Styling issues corrected

### Security
- Security-related changes
- Vulnerability fixes
- Authentication improvements

### Technical
- Internal technical changes
- Build system updates
- Development tool improvements
- Code quality enhancements

---

