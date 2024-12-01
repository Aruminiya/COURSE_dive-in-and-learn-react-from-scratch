// 定義一個動態路由的 Blog 文章頁面元件
// params 參數會自動接收 URL 中的動態參數
export default function BlogPost({ params }) {
  // 將收到的參數印出來以便除錯
  console.log(params);
  
  return (
    // 主要內容區塊
    <main>
      {/* 文章標題 */}
      <h1>BlogPost</h1>
      
      {/* 顯示目前文章的 slug (URL 參數) */}
      <p>Slug: {params.slug}</p>
    </main>
  );
}
