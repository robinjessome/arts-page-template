export const REVALIDATE = 30 //3600

export const HEROBANNER_OPTIONS = {
  height: {
    tall: 'h-[600px]',
    md: 'h-[400px]',
    short: 'h-[200px]',
  },
  bg: {
    gradientPrimary: 'from-primary to-secondary bg-linear-to-br',
    gradientAccent: 'from-primary to-accent bg-linear-to-br',
  },
}

export const CUSTOM_RADIUS = {
  none: '0',
  sm: '8px',
  md: '16px',
  lg: '32px',
}
export const DEFAULT_COLORS = {
  primary: {
    _type: 'color',
    hsl: {
      _type: 'hslaColor',
      a: 1,
      h: 193,
      l: 0.32407638,
      s: 0.97,
    },
  },
  secondary: {
    _type: 'color',
    hex: '#025169',
    hsl: {
      _type: 'hslaColor',
      a: 1,
      h: 193,
      l: 0.21,
      s: 0.96,
    },
  },
  accent: {
    _type: 'color',
    hex: '#ef1d60',
    hsl: {
      _type: 'hslaColor',
      a: 1,
      h: 341,
      l: 0.52,
      s: 0.86,
    },
  },
} as const
