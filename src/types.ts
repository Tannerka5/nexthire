export type Status = 'Applied' | 'Phone Screen' | 'Interview' | 'Offer' | 'Rejected';

export type Source =
  | 'Handshake'
  | 'LinkedIn'
  | 'Referral'
  | 'Career Fair'
  | 'Company Website'
  | 'Indeed'
  | 'Professor/Faculty';

export const STATUS_ORDER: Status[] = ['Applied', 'Phone Screen', 'Interview', 'Offer', 'Rejected'];

export interface Application {
  id: string;
  company: string;
  role: string;
  location: string;
  status: Status;
  appliedDate: string;
  source: Source;
  referenceName?: string;
  referenceRelationship?: string;
  lastFollowUpDate?: string;
  nextAction?: string;
  nextActionDate?: string;
  notes?: string;
}
