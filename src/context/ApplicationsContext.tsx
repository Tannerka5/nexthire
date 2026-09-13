import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Application, Status } from '../types';
import { initialApplications } from '../data/mockApplications';
import { offsetDateISO } from '../utils/date';

interface ApplicationsContextValue {
  applications: Application[];
  updateStatus: (id: string, status: Status) => void;
  completeAction: (id: string) => void;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);

  const updateStatus = useCallback((id: string, status: Status) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== id) return app;
        if (status === 'Rejected') {
          return { ...app, status, nextAction: undefined, nextActionDate: undefined };
        }
        return { ...app, status };
      }),
    );
  }, []);

  const completeAction = useCallback((id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, nextAction: undefined, nextActionDate: undefined, lastFollowUpDate: offsetDateISO(0) }
          : app,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({ applications, updateStatus, completeAction }),
    [applications, updateStatus, completeAction],
  );

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications(): ApplicationsContextValue {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
}
