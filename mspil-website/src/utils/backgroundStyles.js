// Unified background styles for consistency across the website

// Page backgrounds - dark theme only
export const pageBackgrounds = {
  // Primary gradient - subtle animated gradient for glass morphism
  primary: 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900',
  
  // Secondary gradient - used for special pages
  secondary: 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900',
  
  // Simple background - used for content-heavy pages
  simple: 'bg-gray-900',
  
  // Hero specific - dark mode only
  hero: 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900'
};

// Section backgrounds - dark theme only
export const sectionBackgrounds = {
  // Primary section (odd sections) - transparent for video visibility
  primary: 'bg-transparent',
  
  // Secondary section (even sections) - subtle glass effect
  secondary: 'bg-white/5 backdrop-blur-sm',
  
  // Glass section - standard glass morphism
  glass: 'bg-gray-800/10 backdrop-blur-md',
  
  // Accent section - for important sections with glass
  accent: 'bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm',
  
  // CTA section - for call-to-action areas with glass overlay
  cta: 'bg-gradient-to-r from-primary/80 to-primary/60 backdrop-blur-md',
  
  // Transparent - for overlay sections
  transparent: 'bg-transparent'
};

// Card backgrounds - dark theme only
export const cardBackgrounds = {
  // Default card - now with glass morphism
  default: 'bg-gray-800/60 backdrop-blur-md border border-white/20',
  
  // Elevated card with stronger glass effect
  elevated: 'bg-gray-800/70 backdrop-blur-lg shadow-xl border border-white/30',
  
  // Muted card with subtle glass
  muted: 'bg-gray-800/40 backdrop-blur-sm border border-white/10',
  
  // Glass morphism card - standard
  glass: 'bg-gray-800/50 backdrop-blur-md border border-white/20',
  
  // Strong glass effect
  glassStrong: 'bg-gray-800/30 backdrop-blur-xl border border-white/40',
  
  // Primary tinted card with glass
  primary: 'bg-primary/10 backdrop-blur-sm border border-primary/20',
  
  // Gradient card with glass overlay
  gradient: 'bg-gradient-to-br from-gray-800/60 to-gray-900/30 backdrop-blur-md border border-white/20'
};

// Component backgrounds - dark theme only
export const componentBackgrounds = {
  // Input/form field backgrounds
  input: 'bg-gray-800',
  
  // Button backgrounds (in addition to button variants)
  buttonHover: 'hover:bg-gray-700',
  
  // Badge/tag backgrounds
  badge: 'bg-gray-700',
  
  // Tooltip backgrounds
  tooltip: 'bg-gray-800',
  
  // Modal/dialog backgrounds
  modal: 'bg-gray-900',
  
  // Overlay backgrounds
  overlay: 'bg-black/70'
};

// Table backgrounds - dark theme only
export const tableBackgrounds = {
  // Header
  header: 'bg-gray-800',
  
  // Even rows
  evenRow: 'bg-gray-900',
  
  // Odd rows
  oddRow: 'bg-gray-800/50',
  
  // Hover state
  rowHover: 'hover:bg-gray-700'
};

// Dark mode backgrounds (now default)
export const darkModeBackgrounds = {
  // Base dark background
  base: 'bg-gray-900',
  
  // Slightly elevated
  elevated: 'bg-gray-800',
  
  // More elevated
  elevatedMore: 'bg-gray-700',
  
  // Overlay
  overlay: 'bg-gray-900/95'
};

// Utility function to get alternating section background
export const getAlternatingSectionBg = (index) => {
  return index % 2 === 0 ? sectionBackgrounds.primary : sectionBackgrounds.secondary;
};

// Utility function - now returns only dark mode bg
export const withDarkMode = (lightBg, darkBg = 'bg-gray-900') => {
  return darkBg;
};

// Common background patterns - dark theme only
export const backgroundPatterns = {
  // Dot pattern
  dots: `
    bg-[radial-gradient(circle_at_1px_1px,_rgb(34_197_94_/_0.1)_1px,_transparent_1px)]
    bg-[size:24px_24px]
  `,
  
  // Grid pattern
  grid: `
    bg-[linear-gradient(to_right,rgb(34_197_94_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(34_197_94_/_0.1)_1px,transparent_1px)]
    bg-[size:24px_24px]
  `,
  
  // Subtle gradient overlay
  gradientOverlay: `
    before:absolute before:inset-0 
    before:bg-gradient-to-br before:from-primary/10 before:to-transparent
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