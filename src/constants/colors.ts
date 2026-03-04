export const COLORS = {
  // Primary
  navy: '#1a237e',
  navyDark: '#0d1754',
  navyLight: '#283593',
  navyPale: '#e8eaf6',

  // Severity
  critical: '#b71c1c',
  criticalBg: '#ffebee',
  high: '#e65100',
  highBg: '#fff3e0',
  medium: '#f57f17',
  mediumBg: '#fffde7',
  low: '#1565c0',
  lowBg: '#e3f2fd',

  // Status
  success: '#2e7d32',
  successBg: '#e8f5e9',
  warning: '#f57f17',
  warningBg: '#fff8e1',

  // Neutrals
  bgPage: '#f0f2f5',
  bgCard: '#ffffff',
  border: '#e8eaf6',
  borderDark: '#bdbdbd',

  // Text
  textPrimary: '#1a1a2e',
  textSecondary: '#424242',
  textMuted: '#9e9e9e',
  textOnNavy: '#ffffff',
  textOnNavyMuted: 'rgba(255,255,255,0.6)',

  // Saffron accent
  saffron: '#ff6f00',
  saffronLight: '#fff3e0',
} as const;

export type ColorKey = keyof typeof COLORS;
