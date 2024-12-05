import { Suspense } from 'react';
import Link from 'next/link';
import MealsGrid from '@/components/meals/meals-grid';
import classes from './page.module.css';
import { getMeals } from '@/lib/meals';
import MealsLoadingPage from '../loading';
async function Meals(){
  const meals = await getMeals();

  return <MealsGrid meals={meals} />
}

/*
在 Next.js 中，頁面組件可以是異步的，因為 Next.js 在服務器端渲染時會等待這些異步操作完成，然後再將結果發送到客戶端。這樣的設計允許在渲染之前完成數據的獲取。
*/
export default function MealsPage() { 
  
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}


