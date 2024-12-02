import Link from 'next/link';
import LogoImg from '@/assets/logo.png';
import classes from './main-header.module.css';

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        {/* next 的 圖像會儲存到 .src 的屬性下 */}
        <img src={LogoImg.src} alt="A plate with food on it" /> 
        NextLevel Food
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
