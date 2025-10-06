export const colors = {
  black: '#000000',
  white: '#ffffff',
  gray100: '#f3f4f6',
  gray300: '#d1d5db',
  gray600: '#666666',
  brand500: '#4b9cd3',
  brand600: '#3f8fc8',
  brand700: '#337db4',
  brand800: '#2a6694',
  // Status palette (align with Tailwind defaults used in data)
  green500: '#22c55e',
  blue500: '#3b82f6',
  indigo500: '#6366f1',
  amber500: '#f59e0b',
  yellow500: '#eab308',
  violet500: '#8b5cf6',
  red500: '#ef4444',
  neutral400: '#9ca3af',
} as const;

export type ColorToken = keyof typeof colors;


