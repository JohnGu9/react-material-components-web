/// Internal use
/// Just for checkbox, IconButton and radio
import styles from "./CompactWrapper.module.scss";
export function CompactWrapper({ enable, children }: { enable: boolean | undefined, children: React.ReactNode }) {
    if (enable === true) {
        return <div className={styles["compact-wrapper"]}>{children}</div>
    }
    return <>{children}</>;
}
