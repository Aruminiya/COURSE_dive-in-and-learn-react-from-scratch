import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

// 初始化請求配置對象
// 這個空對象作為 useHttp 的參數，用於防止不必要的重複渲染
// 如果每次渲染時都創建新的對象，會導致 useHttp 內部的 useEffect 重新執行
// 通過將其定義在組件外部，確保了引用的穩定性
const requestConfig = {};

export default function Meals() {
  // 使用自定義的 useHttp hook 獲取餐點數據
  // 參數說明：
  // 1. API 端點 URL
  // 2. 請求配置（這裡使用上面定義的 requestConfig）
  // 3. 初始數據（空數組）
  const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

  // 當數據正在加載時，顯示加載中的提示
  if (isLoading) {
    return <p>正在加載...</p>;
  }

  // 當發生錯誤時，顯示錯誤信息
  if (error) {
    return <p>錯誤：{error}</p>;
  }

  // 如果沒有加載到餐點數據或數組為空，顯示相應提示
  if (!loadedMeals || loadedMeals.length === 0) {
    return <p>未找到任何餐點</p>;
  }

  // 渲染餐點列表
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
}
