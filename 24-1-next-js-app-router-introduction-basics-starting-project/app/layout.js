// 導入全局 CSS 樣式
import './globals.css'

// 定義頁面的元數據
// metadata 是 Next.js 的特殊導出，用於設置頁面的 SEO 相關信息
export const metadata = { 
  title: 'NextJS Course App',      // 設置網頁標題
  description: 'Your first NextJS app!',  // 設置網頁描述
};

// Root Layout 組件
// 這是應用程序的根布局組件，所有頁面都會被包裹在這個布局中
// children 參數會被自動注入，代表頁面的主要內容
export default function RootLayout({ children }) {
  return (
    // 設置 HTML 語言為英文
    <html lang="en">
      {/* body 標籤內部放置所有子頁面的內容 */}
      <body>
        {children}
      </body>
    </html>
  );
}
