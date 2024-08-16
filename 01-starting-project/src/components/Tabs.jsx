// ButtonsContainer = "menu" 設定 menu 為預設值
export default function Tabs({ children, buttons, ButtonsContainer = "menu" }) {
  // 透過定義變量來當做動態元素或組件
  // const ButtonsContainer = buttonsContainer
  return (
    <>
      <ButtonsContainer>
        {buttons}
      </ButtonsContainer>
      {children}
    </>
  );
}
