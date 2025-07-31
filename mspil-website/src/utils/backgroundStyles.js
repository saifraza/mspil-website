// Unified background styles for consistency across the website

// Page backgrounds - consistent gradient patterns with subtle animations
export const pageBackgrounds = {
  // Primary gradient - subtle animated gradient for glass morphism
  primary: 'bg-gradient-to-br from-gray-50 via-green-50/20 to-lime-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
  
  // Secondary gradient - used for special pages
  secondary: 'bg-gradient-to-br from-white via-bio-green-50/30 to-eco-lime-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
  
  // Simple background - used for content-heavy pages
  simple: 'bg-gray-50 dark:bg-gray-900',
  
  // Hero specific - maintains existing design but with consistent dark mode
  hero: 'bg-gradient-to-br from-bio-green-100 via-eco-lime-50 to-bio-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900'
};

// Section backgrounds - consistent alternating patterns with glass morphism
export const sectionBackgrounds = {
  // Primary section (odd sections) - transparent for video visibility
  primary: 'bg-transparent',
  
  // Secondary section (even sections) - subtle glass effect
  secondary: 'bg-black/5 dark:bg-white/5 backdrop-blur-sm',
  
  // Glass section - standard glass morphism
  glass: 'bg-white/10 dark:bg-gray-800/10 backdrop-blur-md',
  
  // Accent section - for important sections with glass
  accent: 'bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm',
  
  // CTA section - for call-to-action areas with glass overlay
  cta: 'bg-gradient-to-r from-primary/80 to-primary/60 backdrop-blur-md',
  
  // Transparent - for overlay sections
  transparent: 'bg-transparent'
};

// Card backgrounds - consistent card styles
export const cardBackgrounds = {
  // Default card - now with glass morphism
  default: 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/20',
  
  // Elevated card with stronger glass effect
  elevated: 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-xl border border-white/30',
  
  // Muted card with subtle glass
  muted: 'bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/10',
  
  // Glass morphism card - standard
  glass: 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/20',
  
  // Strong glass effect
  glassStrong: 'bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-white/40',
  
  // Primary tinted card with glass
  primary: 'bg-primary/10 backdrop-blur-sm border border-primary/20',
  
  // Gradient card with glass overlay
  gradient: 'bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-800/60 dark:to-gray-900/30 backdrop-blur-md border border-white/20'
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