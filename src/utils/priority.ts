import type { Application } from '../types';
import { daysFromToday } from './date';

export type UrgencyBucket = 'Overdue' | 'Due Soon' | 'Upcoming';

export const BUCKET_ORDER: UrgencyBucket[] = ['Overdue', 'Due Soon', 'Upcoming'];

export interface PrioritizedItem {
  application: Application;
  bucket: UrgencyBucket;
  diff: number;
}

export function getPrioritizedItems(applications: Application[]): PrioritizedItem[] {
  return applications
    .filter((app) => app.nextActionDate && app.status !== 'Rejected')
    .map((app) => {
      const diff = daysFromToday(app.nextActionDate as string);
      const bucket: UrgencyBucket = diff < 0 ? 'Overdue' : diff <= 2 ? 'Due Soon' : 'Upcoming';
      return { application: app, bucket, diff };
    })
    .sort((a, b) => a.diff - b.diff);
}

export function groupByBucket(items: PrioritizedItem[]): Record<UrgencyBucket, PrioritizedItem[]> {
  const groups: Record<UrgencyBucket, PrioritizedItem[]> = { Overdue: [], 'Due Soon': [], Upcoming: [] };
  for (const item of items) {
    groups[item.bucket].push(item);
  }
  return groups;
}
