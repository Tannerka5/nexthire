import type { Status } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';

export function StatusBadge({ status }: { status: Status }) {
  const style = STATUS_STYLES[status];
  return (
    <span className="badge" style={{ color: style.text, background: style.bg }}>
      <span className="badge-dot" style={{ background: style.dot }} />
      {status}
    </span>
  );
}
