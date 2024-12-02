import Link from 'next/link';
import LogoImg from '@/assets/logo.png';

export default function MainHeader() {
  return (
    <header>
      <Link href="/">
        {/* next 的 圖像會儲存到 .src 的屬性下 */}
        <img src={LogoImg.src} alt="A plate with food on it" /> 
        NextLevel Food
      </Link>

      <nav>
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
