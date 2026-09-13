import { useMemo, useState } from 'react';
import { useApplications } from '../context/ApplicationsContext';
import { STATUS_ORDER } from '../types';
import type { Status } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';
import { bucketForDiff } from '../utils/priority';
import { BUCKET_STYLES } from '../utils/urgencyStyles';
import { daysFromToday, describeDueDate, formatDate } from '../utils/date';
import styles from './ApplicationBoard.module.css';

export function ApplicationBoard() {
  const { applications, updateStatus } = useApplications();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter(
      (app) => app.company.toLowerCase().includes(q) || app.role.toLowerCase().includes(q),
    );
  }, [applications, query]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Applications</h1>
          <p className={styles.subtitle}>
            {filtered.length} of {applications.length} applications, grouped by status.
          </p>
        </div>
        <input
          type="search"
          className={styles.search}
          placeholder="Search company or role"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search applications by company or role"
        />
      </div>

      <div className={styles.board}>
        {STATUS_ORDER.map((status) => {
          const apps = filtered.filter((app) => app.status === status);
          const style = STATUS_STYLES[status];
          return (
            <div key={status} className={styles.column}>
              <div className={styles.columnHeader} style={{ borderBottomColor: style.dot }}>
                <span className={styles.columnDot} style={{ background: style.dot }} />
                <span className={styles.columnTitle}>{status}</span>
                <span className={styles.columnCount} style={{ background: style.bg, color: style.text }}>
                  {apps.length}
                </span>
              </div>

              {apps.length === 0 ? (
                <div className={styles.columnEmpty}>Nothing here.</div>
              ) : (
                apps.map((app) => (
                  <div key={app.id} className={`card ${styles.appCard}`}>
                    <div>
                      <div className={styles.company}>{app.company}</div>
                      <div className={styles.role}>{app.role}</div>
                    </div>

                    <div className={styles.meta}>
                      {app.location} · via {app.source}
                    </div>

                    {app.referenceName && (
                      <div className={styles.reference}>
                        Reference: {app.referenceName}
                        {app.referenceRelationship ? ` — ${app.referenceRelationship}` : ''}
                      </div>
                    )}

                    {app.nextAction && app.nextActionDate && (
                      <div className={styles.nextAction}>
                        <div
                          className={styles.nextActionDue}
                          style={{ color: BUCKET_STYLES[bucketForDiff(daysFromToday(app.nextActionDate))].text }}
                        >
                          {describeDueDate(app.nextActionDate)}
                        </div>
                        <div>{app.nextAction}</div>
                      </div>
                    )}

                    <div className={styles.cardFooter}>
                      <span className={styles.appliedDate}>Applied {formatDate(app.appliedDate)}</span>
                      <select
                        className={styles.statusSelect}
                        value={app.status}
                        onChange={(event) => updateStatus(app.id, event.target.value as Status)}
                        aria-label={`Change status for ${app.company}`}
                      >
                        {STATUS_ORDER.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
