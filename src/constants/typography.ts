export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const FONT_WEIGHT = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const LINE_HEIGHT = {
  xs: 14,
  sm: 16,
  base: 20,
  md: 24,
  lg: 28,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
  '4xl': 44,
} as const;

export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

export const TYPOGRAPHY = {
  h1: {
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT['3xl'],
    letterSpacing: LETTER_SPACING.tight,
  },
  h2: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT['2xl'],
    letterSpacing: LETTER_SPACING.tight,
  },
  h3: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
    lineHeight: LINE_HEIGHT.xl,
  },
  h4: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    lineHeight: LINE_HEIGHT.lg,
  },
  body: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.base,
  },
  bodyMedium: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.base,
  },
  bodySm: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.sm,
  },
  caption: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.xs,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    lineHeight: LINE_HEIGHT.sm,
    letterSpacing: LETTER_SPACING.wide,
  },
  mono: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.sm,
    fontFamily: 'monospace',
  },
} as const;
