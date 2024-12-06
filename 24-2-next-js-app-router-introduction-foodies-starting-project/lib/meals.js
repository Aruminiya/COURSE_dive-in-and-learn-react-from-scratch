// better-sqlite3 是一個輕量級的 SQLite 庫，用於 Node.js 和瀏覽器環境。它提供了簡單的 API 來進行數據庫操作。
import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  /*
    這邊是故意延長資料庫回傳時間, 純粹是為了學習探索加載狀態, 實際開發千萬不要這樣做
  */
  await new Promise((resolve) => setTimeout(resolve, 2000)); 

  // throw new Error('Failed to fetch meals');
  return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}