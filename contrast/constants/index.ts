export const AUDIT_WEIGHTS = {
  contrast:   0.40,
  altText:    0.30,
  typography: 0.15,
  spacing:    0.15,
} as const

export const GRADE_THRESHOLDS = {
  excellent: 90,
  good:      70,
  warn:      50,
} as const

export const CONTRAST_THRESHOLDS = {
  normal: 4.5,
  large:  3.0,
  aaa:    7.0,
} as const

export const LOADING_STEPS = [
  'Taking a screenshot',
  'Checking contrast ratios',
  'Scanning for missing alt text',
  'Calculating your score',
] as const

export const RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 60 * 60 * 1000,
} as const

export const ERROR_MESSAGES = {
  invalidUrl:    "That doesn't look like a valid URL. Try including https://",
  unreachable:   "We couldn't load that page. Is it publicly accessible?",
  loginWall:     "This page might be behind a login — we can only audit public pages",
  rateLimit:     "You've run 10 audits this hour. Try again later.",
  timeout:       "This page is taking longer than usual.",
  generic:       "Something went wrong on our end. Try again in a moment.",
  geminiLimit:   "AI suggestions are resting — your audit scores are still accurate.",
} as const
