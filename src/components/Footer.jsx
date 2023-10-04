import { ReactComponent as GitHubIcon } from '../assets/github.svg';
import footerStyles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <a
        href="https://github.com/serjilyashenko/HabitIT"
        target="_blank"
        rel="noreferrer"
        aria-label="github link"
      >
        <GitHubIcon className={footerStyles.logo} />
      </a>
    </footer>
  );
}
