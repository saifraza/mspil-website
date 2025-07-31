// Unified background styles for consistency across the website

// Page backgrounds - consistent gradient patterns
export const pageBackgrounds = {
  // Primary gradient - used for main pages
  primary: 'bg-gradient-to-b from-bio-green-50 via-white to-eco-lime-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
  
  // Secondary gradient - used for special pages
  secondary: 'bg-gradient-to-br from-white via-bio-green-50/30 to-eco-lime-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
  
  // Simple background - used for content-heavy pages
  simple: 'bg-background dark:bg-gray-900',
  
  // Hero specific - maintains existing design but with consistent dark mode
  hero: 'bg-gradient-to-br from-bio-green-100 via-eco-lime-50 to-bio-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900'
};

// Section backgrounds - consistent alternating patterns
export const sectionBackgrounds = {
  // Primary section (odd sections)
  primary: 'bg-background dark:bg-gray-900',
  
  // Secondary section (even sections)
  secondary: 'bg-muted/30 dark:bg-gray-800/50',
  
  // Accent section - for important sections
  accent: 'bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5',
  
  // CTA section - for call-to-action areas
  cta: 'bg-gradient-to-r from-primary to-primary/90 dark:from-primary/80 dark:to-primary/70',
  
  // Transparent - for overlay sections
  transparent: 'bg-transparent'
};

// Card backgrounds - consistent card styles
export const cardBackgrounds = {
  // Default card
  default: 'bg-card dark:bg-gray-800',
  
  // Elevated card
  elevated: 'bg-card shadow-lg dark:bg-gray-800',
  
  // Muted card
  muted: 'bg-muted/50 dark:bg-gray-800/50',
  
  // Glass morphism card
  glass: 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md',
  
  // Primary tinted card
  primary: 'bg-primary/5 dark:bg-primary/10',
  
  // Gradient card
  gradient: 'bg-gradient-to-br from-white to-muted dark:from-gray-800 dark:to-gray-900'
};

// Component backgrounds - for smaller components
export const componentBackgrounds = {
  // Input/form field backgrounds
  input: 'bg-background dark:bg-gray-800',
  
  // Button backgrounds (in addition to button variants)
  buttonHover: 'hover:bg-muted dark:hover:bg-gray-700',
  
  // Badge/tag backgrounds
  badge: 'bg-muted dark:bg-gray-700',
  
  // Tooltip backgrounds
  tooltip: 'bg-popover dark:bg-gray-800',
  
  // Modal/dialog backgrounds
  modal: 'bg-background dark:bg-gray-900',
  
  // Overlay backgrounds
  overlay: 'bg-black/50 dark:bg-black/70'
};

// Table backgrounds - consistent table styling
export const tableBackgrounds = {
  // Header
  header: 'bg-muted/50 dark:bg-gray-800',
  
  // Even rows
  evenRow: 'bg-background dark:bg-gray-900',
  
  // Odd rows
  oddRow: 'bg-muted/30 dark:bg-gray-800/50',
  
  // Hover state
  rowHover: 'hover:bg-muted/50 dark:hover:bg-gray-700'
};

// Dark mode specific backgrounds
export const darkModeBackgrounds = {
  // Base dark background
  base: 'dark:bg-gray-900',
  
  // Slightly elevated
  elevated: 'dark:bg-gray-800',
  
  // More elevated
  elevatedMore: 'dark:bg-gray-700',
  
  // Overlay
  overlay: 'dark:bg-gray-900/95'
};

// Utility function to get alternating section background
export const getAlternatingSectionBg = (index) => {
  return index % 2 === 0 ? sectionBackgrounds.primary : sectionBackgrounds.secondary;
};

// Utility function to ensure consistent dark mode
export const withDarkMode = (lightBg, darkBg = 'dark:bg-gray-900') => {
  return `${lightBg} ${darkBg}`;
};

// Common background patterns as CSS classes
export const backgroundPatterns = {
  // Dot pattern
  dots: `
    bg-[radial-gradient(circle_at_1px_1px,_rgb(34_197_94_/_0.05)_1px,_transparent_1px)]
    dark:bg-[radial-gradient(circle_at_1px_1px,_rgb(34_197_94_/_0.1)_1px,_transparent_1px)]
    bg-[size:24px_24px]
  `,
  
  // Grid pattern
  grid: `
    bg-[linear-gradient(to_right,rgb(34_197_94_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(34_197_94_/_0.05)_1px,transparent_1px)]
    dark:bg-[linear-gradient(to_right,rgb(34_197_94_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(34_197_94_/_0.1)_1px,transparent_1px)]
    bg-[size:24px_24px]
  `,
  
  // Subtle gradient overlay
  gradientOverlay: `
    before:absolute before:inset-0 
    before:bg-gradient-to-br before:from-primary/5 before:to-transparent
    dark:before:from-primary/10 dark:before:to-transparent
    before:pointer-events-none
  `
};

// Export everything as default
export default {
  pageBackgrounds,
  sectionBackgrounds,
  cardBackgrounds,
  componentBackgrounds,
  tableBackgrounds,
  darkModeBackgrounds,
  getAlternatingSectionBg,
  withDarkMode,
  backgroundPatterns
};