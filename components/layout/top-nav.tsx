import * as React from "react";
import { resetDemoTasksAction } from "@/actions/task-actions";
import { Tooltip } from "@/components/primitives/tooltip/tooltip";
import styles from "./top-nav.module.scss";

interface TopNavProps {
  onRefresh: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  totalTasks: number;
  completedTasks: number;
}

export function TopNav({
  onRefresh,
  theme,
  onToggleTheme,
  totalTasks,
  completedTasks,
}: TopNavProps) {
  const [isResetting, setIsResetting] = React.useState(false);

  const handleResetDemo = async () => {
    setIsResetting(true);
    await resetDemoTasksAction();
    setIsResetting(false);
    onRefresh();
  };

  const percent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header className={styles.navHeader}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <div className={styles.logoBadge}>
            <span className={styles.logoIcon}>⚡</span>
            <div>
              <h1 className={styles.logoTitle}>TaskFlow Enterprise</h1>
              <span className={styles.logoSub}>
                Next.js 16 • React 19 • Base UI • CSS Modules
              </span>
            </div>
          </div>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.progressChip}>
            <span className={styles.progressLabel}>Sprint Progress</span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className={styles.progressValue}>{percent}%</span>
          </div>

          <Tooltip text="Reset workspace to initial demo dataset">
            <button
              type="button"
              onClick={handleResetDemo}
              disabled={isResetting}
              className={styles.actionBtn}
            >
              {isResetting ? "↻ Resetting..." : "↻ Reset Workspace"}
            </button>
          </Tooltip>

          <Tooltip
            text={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          >
            <button
              type="button"
              onClick={onToggleTheme}
              className={styles.iconBtn}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
