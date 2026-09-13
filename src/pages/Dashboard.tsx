import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useApplications } from '../context/ApplicationsContext';
import { STATUS_ORDER } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { STATUS_STYLES } from '../utils/statusStyles';
import { getPrioritizedItems } from '../utils/priority';
import { BUCKET_STYLES } from '../utils/urgencyStyles';
import { describeDueDate } from '../utils/date';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const { applications, completeAction } = useApplications();

  const total = applications.length;
  const interviewing = applications.filter((app) => app.status === 'Interview').length;
  const offers = applications.filter((app) => app.status === 'Offer').length;
  const rejected = applications.filter((app) => app.status === 'Rejected').length;

  const prioritized = getPrioritizedItems(applications);
  const needsAttention = prioritized.filter((item) => item.bucket !== 'Upcoming').length;
  const top = prioritized[0];

  const counts = STATUS_ORDER.map((status) => ({
    status,
    count: applications.filter((app) => app.status === status).length,
  }));

  const storyParts: ReactNode[] = [];
  if (interviewing > 0) {
    storyParts.push(
      <span key="interviewing">
        <strong>{interviewing}</strong> at the interview stage
      </span>,
    );
  }
  if (offers > 0) {
    storyParts.push(
      <span key="offers">
        <strong>{offers}</strong> with an offer on the table
      </span>,
    );
  }
  if (rejected > 0) {
    storyParts.push(
      <span key="rejected">
        <strong>{rejected}</strong> that didn't pan out
      </span>,
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.hero}>
        <h1 className={styles.headline}>Know exactly where every application stands.</h1>
        <p className={styles.subhead}>
          NextHire tracks your applications, references, and follow-ups in one place — so your energy goes
          toward applying and networking, not spreadsheet upkeep.
        </p>
      </div>

      <div className="card">
        <div className={styles.spotlight}>
          <h2 className={styles.eyebrow}>Next up</h2>
          {top ? (
            <>
              <div className={styles.spotlightRow}>
                <div>
                  <div className={styles.spotlightCompany}>{top.application.company}</div>
                  <div className={styles.spotlightRole}>{top.application.role}</div>
                </div>
                <StatusBadge status={top.application.status} />
              </div>
              <p className={styles.spotlightDue} style={{ color: BUCKET_STYLES[top.bucket].text }}>
                {describeDueDate(top.application.nextActionDate as string)}
              </p>
              <p className={styles.spotlightAction}>{top.application.nextAction}</p>
              <div className={styles.spotlightActions}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => completeAction(top.application.id)}
                >
                  Mark as done
                </button>
                <Link to="/priorities" className="btn btn-ghost">
                  {needsAttention > 1 ? `See ${needsAttention - 1} more →` : 'View priorities →'}
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className={styles.spotlightCaughtUp}>
                You're all caught up — nothing needs attention right now.
              </p>
              <Link to="/applications" className="btn btn-ghost">
                Browse your applications →
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <div className={styles.narrative}>
          <h2 className={styles.sectionHeading}>The bigger picture</h2>
          <p className={styles.narrativeText}>
            You're tracking <strong>{total}</strong> application{total === 1 ? '' : 's'}
            {storyParts.length > 0 && (
              <>
                {' — '}
                {storyParts.map((part, index) => (
                  <span key={index}>
                    {index > 0 && (index === storyParts.length - 1 ? ', and ' : ', ')}
                    {part}
                  </span>
                ))}
              </>
            )}
            . {rejected > 0 ? "That's a normal shape for a search this size." : "Off to a solid start."}
          </p>
          <div className={styles.bar}>
            {counts.map(({ status, count }) =>
              count === 0 ? null : (
                <div
                  key={status}
                  className={styles.barSegment}
                  style={{ width: `${(count / total) * 100}%`, background: STATUS_STYLES[status].dot }}
                  title={`${status}: ${count}`}
                />
              ),
            )}
          </div>
          <div className={styles.legend}>
            {counts.map(({ status, count }) => (
              <div key={status} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: STATUS_STYLES[status].dot }} />
                {status} <span className={styles.legendCount}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingTop}`}>Continue</h2>
      <div className={styles.quickLinks}>
        <Link to="/applications" className={`card ${styles.quickLink}`}>
          <span className={styles.quickLinkTitle}>All applications →</span>
          <span className={styles.quickLinkDesc}>
            Every application grouped by status, with references and sources at a glance.
          </span>
        </Link>
        <Link to="/priorities" className={`card ${styles.quickLink}`}>
          <span className={styles.quickLinkTitle}>What needs attention →</span>
          <span className={styles.quickLinkDesc}>
            Follow-ups and next steps, ordered by urgency, so you know what to do first.
          </span>
        </Link>
      </div>
    </div>
  );
}
