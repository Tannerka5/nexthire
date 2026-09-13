import type { Status } from '../types';

export interface StatusStyle {
  text: string;
  bg: string;
  dot: string;
}

export const STATUS_STYLES: Record<Status, StatusStyle> = {
  Applied: { text: 'var(--color-applied-text)', bg: 'var(--color-applied-bg)', dot: 'var(--color-applied-dot)' },
  'Phone Screen': { text: 'var(--color-phone-text)', bg: 'var(--color-phone-bg)', dot: 'var(--color-phone-dot)' },
  Interview: { text: 'var(--color-interview-text)', bg: 'var(--color-interview-bg)', dot: 'var(--color-interview-dot)' },
  Offer: { text: 'var(--color-offer-text)', bg: 'var(--color-offer-bg)', dot: 'var(--color-offer-dot)' },
  Rejected: { text: 'var(--color-rejected-text)', bg: 'var(--color-rejected-bg)', dot: 'var(--color-rejected-dot)' },
};
