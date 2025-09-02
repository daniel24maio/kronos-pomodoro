import { HistoryIcon, HouseIcon, SettingsIcon, StethoscopeIcon, TimerIcon } from 'lucide-react';
import styles from './Styles.module.css'

export function Menu() {

    return (
        <nav className={styles.menu}>
            <a className={styles.menuLink} href='#'>
                <HouseIcon/>
            </a>
            <a className={styles.menuLink} href='#'>
                <HistoryIcon/>
            </a>
            <a className={styles.menuLink} href='#'>
                <SettingsIcon/>
            </a>
            <a className={styles.menuLink} href='#'>
                <TimerIcon/>
            </a>
        </nav>
    );
}