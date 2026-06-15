import { AuditResult } from './types'

export const MOCK_RESULT: AuditResult = {
  id: 'mock123',
  url: 'stripe.com',
  auditedAt: new Date().toISOString(),
  scores: {
    contrast: 91,
    altText: 38,
    typography: 82,
    spacing: 88,
    overall: 74,
  },
  issues: [
    { severity: 'critical', category: 'altText', message: 'Image missing alt text', element: 'img.hero-image', value: 'missing' },
    { severity: 'critical', category: 'contrast', message: 'Low contrast text', element: '.footer p', value: '2.1:1' },
    { severity: 'warn', category: 'contrast', message: 'Low contrast text: "Learn more"', element: 'a.cta-link', value: '3.2:1' },
    { severity: 'warn', category: 'altText', message: 'Image missing alt text', element: 'img.team-photo', value: 'missing' },
    { severity: 'info', category: 'typography', message: '4 font families detected', element: 'body', value: '4' },
  ],
  screenshotUrl: null,
}
