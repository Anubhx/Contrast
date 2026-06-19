import React from 'react';
import { HowItWorksStep, RecentAuditData, WhatWeCheckItem } from '@/lib/types';

export const HERO_BADGES = [
  { label: 'Color contrast', colorClass: 'bg-grade-excellent' },
  { label: 'Alt text', colorClass: 'bg-grade-excellent' },
  { label: 'Typography', colorClass: 'bg-grade-excellent' },
  { label: 'Spacing', colorClass: 'bg-grade-excellent' },
];

export const RECENT_AUDITS: RecentAuditData[] = [
  { id: 'example-stripe', domain: 'stripe.com', score: 91, issues: 2, date: 'Jun 14 · 1.2s', color: 'var(--color-grade-excellent)' },
  { id: 'example-linear', domain: 'linear.app', score: 87, issues: 4, date: 'Jun 14 · 0.9s', color: 'var(--color-grade-excellent)' },
  { id: 'example-zomato', domain: 'zomato.com', score: 63, issues: 11, date: 'Jun 13 · 2.1s', color: 'var(--color-grade-warn)' },
  { id: 'example-swiggy', domain: 'swiggy.com', score: 71, issues: 8, date: 'Jun 13 · 1.8s', color: 'var(--color-grade-good)' },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: '01',
    title: 'Paste your URL',
    description: 'Enter any publicly accessible website. No login, no extension, no setup needed.',
    badge: 'https://yoursite.com',
  },
  {
    id: '02',
    title: 'We run the audit',
    description: 'A headless browser loads the page and runs WCAG checks across contrast, images, type, and layout.',
    badge: '~10 seconds',
  },
  {
    id: '03',
    title: 'Read your report',
    description: 'Get a scored report with every issue listed by severity, CSS selector, and measured value.',
    badge: 'Scored 0–100',
  },
  {
    id: '04',
    title: 'Share or download',
    description: 'Every audit gets a permanent URL. Share with your team or download a one-page PDF.',
    badge: 'PDF · Link · OG card',
  },
];

export const WHAT_WE_CHECK_ITEMS: WhatWeCheckItem[] = [
  {
    id: 'color-contrast',
    icon: '◑',
    title: 'Color contrast',
    description: 'Every text–background pair measured against WCAG 2.1 AA. We surface the actual ratio so you know exactly what needs fixing.',
    threshold: React.createElement(React.Fragment, null, "Threshold: 4.5:1 normal · 3:1 large text", React.createElement("br"), "Weight: 40% of overall score"),
  },
  {
    id: 'alt-text',
    icon: '⊡',
    title: 'Alt text coverage',
    description: 'Every meaningful image checked for a non-empty alt attribute. Decorative images with role="presentation" correctly excluded.',
    threshold: React.createElement(React.Fragment, null, "WCAG 1.1.1 — Level A", React.createElement("br"), "Weight: 30% of overall score"),
  },
  {
    id: 'typography',
    icon: 'Aa',
    title: 'Typography consistency',
    description: 'Counts distinct font families loaded on the page. More than two almost always indicates design system inconsistency.',
    threshold: React.createElement(React.Fragment, null, "Target: ≤2 font families", React.createElement("br"), "Weight: 15% of overall score"),
  },
  {
    id: 'spacing',
    icon: '⊞',
    title: 'Spacing consistency',
    description: 'Margin and padding values sampled and checked against an 8px grid. Off-grid values signal ad-hoc spacing that breaks visual rhythm.',
    threshold: React.createElement(React.Fragment, null, "Grid: 8px base unit", React.createElement("br"), "Weight: 15% of overall score"),
  },
];
