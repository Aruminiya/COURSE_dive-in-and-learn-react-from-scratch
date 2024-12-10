// better-sqlite3 是一個輕量級的 SQLite 庫，用於 Node.js 和瀏覽器環境。它提供了簡單的 API 來進行數據庫操作。
import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

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

/**
 * 異步函數 saveMeal
 * 
 * 此函數負責將餐點信息保存到數據庫中，並將上傳的圖片保存到伺服器的公共目錄中。
 * 
 * @param {Object} meal - 包含餐點信息的物件，應包括標題、摘要、說明、創建者信息和圖片。
 * 
 * 步驟：
 * 1. 使用 slugify 將餐點標題轉換為 URL 友好的格式，並存儲在 meal.slug 中。
 * 2. 使用 xss 函數清理餐點說明，以防止 XSS 攻擊。
 * 3. 獲取圖片的擴展名，並生成新的文件名，格式為 "slug.擴展名"。
 * 4. 將圖片保存到 `public/images/` 目錄中。
 * 5. 將圖片的路徑更新為相對於公共目錄的路徑。
 * 6. 使用 SQLite 將餐點信息插入到 meals 數據表中。
 */
export async function saveMeal(meal) { 
  meal.slug = slugify(meal.title, { lower: true }); // 將標題轉換為 slug
  meal.instructions = xss(meal.instructions); // 清理說明以防止 XSS

  const extension = meal.image.name.split('.').pop(); // 獲取圖片擴展名
  const fileName = `${meal.slug}.${extension}`; // 生成文件名

  const stream = fs.createWriteStream(`public/images/${fileName}`); // 保存圖片
  const bufferedImage = await meal.image.arrayBuffer(); // 獲取圖片的緩衝區

  stream.write(Buffer.from(bufferedImage), (error) => { // 寫入圖片
    if (error) {
      throw new Error('Saveing image failed!'); // 處理錯誤
    }
  });

  meal.image = `/images/${fileName}`; // 更新圖片路徑

  db.prepare(`
    INSERT INTO meals 
    (title, summary, instructions, creator, creator_email, image, slug) 
    VALUES (
      @title, 
      @summary, 
      @instructions, 
      @creator, 
      @creator_email, 
      @image, 
      @slug
    )
  `).run(meal); // 插入數據庫
}
