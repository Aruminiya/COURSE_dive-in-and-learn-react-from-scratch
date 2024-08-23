import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemaininingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => { // useImperativeHandle 用於自定義暴露給父組件的 ref 方法
    return {
      open() { // open 的名稱是自訂的
        dialog.current.showModal()
      }
    };
  });
  // - `useImperativeHandle` 允許你在子組件中定義一組方法或屬性，這些方法或屬性會被綁定到傳遞給子組件的 ref 上。
  // - 父組件可以通過 ref 訪問並調用這些自定義的方法或屬性。
  // - `useImperativeHandle` 並不是在父組件調用 ref 時自動觸發的，而是用於定義 ref 應該暴露哪些方法或屬性。
  
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timer with <strong>{formattedRemaininingTime} seconds left.</strong></p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
})

export default ResultModal