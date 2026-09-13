import { useState } from 'react';
import { useApplications } from '../context/ApplicationsContext';
import { BUCKET_ORDER, getPrioritizedItems, groupByBucket } from '../utils/priority';
import { BUCKET_STYLES } from '../utils/urgencyStyles';
import { StatusBadge } from '../components/StatusBadge';
import { describeDueDate } from '../utils/date';
import styles from './PriorityList.module.css';

export function PriorityList() {
  const { applications, completeAction } = useApplications();
  const [showUpcoming, setShowUpcoming] = useState(false);
  const prioritized = getPrioritizedItems(applications);
  const groups = groupByBucket(prioritized);

  const totalOpen = prioritized.length;

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Priorities</h1>
        <p className={styles.subtitle}>
          {totalOpen === 0
            ? 'Everything that needs a next step, ordered by urgency.'
            : `Here's what matters most first — ${totalOpen} thing${totalOpen === 1 ? '' : 's'} in total.`}
        </p>
      </div>

      {totalOpen === 0 ? (
        <div className="card">
          <div className={styles.emptyState}>
            <div className={styles.emptyTitle}>You're all caught up.</div>
            <p>No follow-ups or next steps are waiting on you right now.</p>
          </div>
        </div>
      ) : (
        BUCKET_ORDER.map((bucket) => {
          const items = groups[bucket];
          if (items.length === 0) return null;
          const style = BUCKET_STYLES[bucket];
          const isUpcoming = bucket === 'Upcoming';
          const isCollapsed = isUpcoming && !showUpcoming;

          return (
            <div key={bucket} className={styles.bucket}>
              <div className={styles.bucketHeader}>
                <span className={styles.bucketDot} style={{ background: style.edge }} />
                <span className={styles.bucketTitle} style={{ color: style.text }}>
                  {bucket}
                </span>
                <span className={styles.bucketCount}>
                  {items.length} · {style.description}
                </span>
                {isUpcoming && (
                  <button
                    type="button"
                    className={styles.toggle}
                    onClick={() => setShowUpcoming((value) => !value)}
                    aria-expanded={!isCollapsed}
                  >
                    {isCollapsed ? `Show ${items.length}` : 'Hide for now'}
                  </button>
                )}
              </div>

              {!isCollapsed && (
                <div className={styles.list}>
                  {items.map(({ application }) => (
                    <div
                      key={application.id}
                      className={`card ${styles.item}`}
                      style={{ borderLeftColor: style.edge }}
                    >
                      <div className={styles.itemMain}>
                        <div className={styles.itemTop}>
                          <span className={styles.company}>{application.company}</span>
                          <span className={styles.role}>{application.role}</span>
                          <StatusBadge status={application.status} />
                        </div>
                        <div className={styles.dueLabel} style={{ color: style.text }}>
                          {describeDueDate(application.nextActionDate as string)}
                        </div>
                        <div className={styles.actionText}>{application.nextAction}</div>
                      </div>
                      <div className={styles.itemActions}>
                        <button
                          type="button"
                          className="btn btn-quiet"
                          onClick={() => completeAction(application.id)}
                        >
                          Mark as done
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
