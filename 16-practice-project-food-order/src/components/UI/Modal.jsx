import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';
export default function Modal({ children, open, className = '' }) {
  const dialog = useRef(null);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')
  )
}