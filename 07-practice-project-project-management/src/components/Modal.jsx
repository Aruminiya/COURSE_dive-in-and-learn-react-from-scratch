import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from './Button';

  const Modal = forwardRef(({children, buttonCaption}, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => { // useImperativeHandle 用於自定義暴露給父組件的 ref 方法
    return {
      open() { // open 的名稱是自訂的
        dialog.current.showModal()
      }
    };
  });

  function handleDialogBackgroundClose(event) {
    if (event.target === dialog.current) {
      event.target.close();
    }
  };

  return createPortal(
  <dialog onClick={handleDialogBackgroundClose} ref={dialog} className='backdrop:bg-stone-900/90 rounded-md shadow-md'>
    <div className='m-4'>
      {children}
      <form method="dialog" className='mt-4 text-right'>
        <Button>{buttonCaption}</Button>
      </form>
    </div>
  </dialog>,
  document.getElementById('modal-root')
  )
});

export default Modal