import { TimerIcon } from 'lucide-react';
import styles from './Styles.module.css'

type LogoProps = {
    children: React.ReactNode;
}

export function Logo({ children }: LogoProps) {

    return (
        <div className={styles.logo}>
            {children}
            <a className={styles.logoLink} href='#'>
                <TimerIcon/>
                <span>Chronos</span>
            </a>
        </div>
    );
}