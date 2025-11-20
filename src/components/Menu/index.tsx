import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {

    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
        return storageTheme;
    });

    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
        event.preventDefault();
        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        })
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme',theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    };

    return (
        <nav className={styles.menu}>
            <RouterLink
                className={styles.menuLink}
                href='/'
                aria-label='Ir para a Home'
                title='Ir para Home'>
                <HouseIcon />
            </RouterLink>
            <RouterLink
                className={styles.menuLink}
                href='/history/'
                aria-label='Visualizar Histórico'
                title='Visualizar Histórico'>

                <HistoryIcon />
             </RouterLink>
            <RouterLink
                className={styles.menuLink}
                href='/settings/'
                aria-label='Ir para Configurações'
                title='Ir para Configurações'>
                <SettingsIcon />
            </RouterLink>
            <RouterLink
                className={styles.menuLink}
                href='#'
                aria-label='Mudar cor do Tema'
                title='Mudar cor do Tema'
                onClick={handleThemeChange}>
                {nextThemeIcon[theme]}
            </RouterLink>
        </nav>
    );
}