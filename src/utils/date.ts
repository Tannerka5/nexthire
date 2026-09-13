function atMidnight(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function offsetDateISO(dayOffset: number): string {
  const date = atMidnight(new Date());
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().slice(0, 10);
}

export function daysFromToday(iso: string): number {
  const target = atMidnight(new Date(iso));
  const today = atMidnight(new Date());
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((target.getTime() - today.getTime()) / msPerDay);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function describeDueDate(iso: string): string {
  const diff = daysFromToday(iso);
  if (diff < -1) return `Overdue by ${Math.abs(diff)} days`;
  if (diff === -1) return 'Overdue by 1 day';
  if (diff === 0) return 'Due today';
  if (diff === 1) return 'Due tomorrow';
  return `Due in ${diff} days`;
}

export function describeSince(iso: string): string {
  const diff = Math.abs(daysFromToday(iso));
  if (diff === 0) return 'today';
  if (diff === 1) return '1 day ago';
  return `${diff} days ago`;
}
