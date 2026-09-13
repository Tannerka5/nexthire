import type { UrgencyBucket } from './priority';

export interface UrgencyStyle {
  text: string;
  bg: string;
  edge: string;
  description: string;
}

export const BUCKET_STYLES: Record<UrgencyBucket, UrgencyStyle> = {
  Overdue: {
    text: 'var(--color-overdue-text)',
    bg: 'var(--color-overdue-bg)',
    edge: 'var(--color-overdue-edge)',
    description: 'Worth a look when you have a moment',
  },
  'Due Soon': {
    text: 'var(--color-soon-text)',
    bg: 'var(--color-soon-bg)',
    edge: 'var(--color-soon-edge)',
    description: 'Coming up in the next 2 days',
  },
  Upcoming: {
    text: 'var(--color-upcoming-text)',
    bg: 'var(--color-upcoming-bg)',
    edge: 'var(--color-upcoming-edge)',
    description: 'Not urgent yet',
  },
};
