import { Link } from 'react-router-dom';
import { useApplications } from '../context/ApplicationsContext';
import { STATUS_ORDER } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';
import { getPrioritizedItems } from '../utils/priority';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const { applications } = useApplications();

  const total = applications.length;
  const active = applications.filter((app) => app.status !== 'Rejected').length;
  const interviewing = applications.filter((app) => app.status === 'Interview').length;
  const offers = applications.filter((app) => app.status === 'Offer').length;

  const prioritized = getPrioritizedItems(applications);
  const needsAttention = prioritized.filter((item) => item.bucket !== 'Upcoming').length;

  const counts = STATUS_ORDER.map((status) => ({
    status,
    count: applications.filter((app) => app.status === status).length,
  }));

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.hero}>
        <h1 className={styles.headline}>Know exactly where every application stands.</h1>
        <p className={styles.subhead}>
          NextHire tracks your applications, references, and follow-ups in one place — so your energy goes
          toward applying and networking, not spreadsheet upkeep.
        </p>
      </div>

      <div className={styles.statGrid}>
        <div className="card">
          <div className={styles.statTile}>
            <span className={styles.statNumber}>{total}</span>
            <span className={styles.statLabel}>Total applications</span>
          </div>
        </div>
        <Link to="/priorities" className={`card ${styles.statTileLink}`}>
          <div className={`${styles.statTile} ${styles.statTileHighlight}`}>
            <span className={styles.statNumber}>{needsAttention}</span>
            <span className={styles.statLabel}>Need attention now</span>
            <span className={styles.statLink}>View priorities →</span>
          </div>
        </Link>
        <div className="card">
          <div className={styles.statTile}>
            <span className={styles.statNumber}>{interviewing}</span>
            <span className={styles.statLabel}>In interview stage</span>
          </div>
        </div>
        <div className="card">
          <div className={styles.statTile}>
            <span className={styles.statNumber}>{offers}</span>
            <span className={styles.statLabel}>Active offers</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className={styles.overview}>
          <div className={styles.sectionHeading}>Where things stand · {active} active of {total}</div>
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

      <div className={styles.sectionHeading} style={{ marginTop: 32 }}>
        Jump to
      </div>
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
