/* Modal Component — Sorbet Future Fit Design System
   Bottom sheet on mobile, centered dialog on desktop */
import React, { useEffect } from 'react';
import { Button } from './Button';
import { FiX } from 'react-icons/fi';

export const Modal = ({ isOpen, onClose, title, children, showClose = true, footer, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidths = { sm: '380px', md: '480px', lg: '600px', xl: '760px' };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="modal-content animate-slide-up" style={{ maxWidth: maxWidths[size] || maxWidths.md }}>
        <div className="modal-handle" />
        {(title || showClose) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
            {title && <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{title}</h3>}
            {showClose && (
              <button onClick={onClose} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-cream-deep)', border: '1px solid var(--color-border)', cursor: 'pointer' }} aria-label="Close">
                <FiX size={18} color="var(--text-secondary)" />
              </button>
            )}
          </div>
        )}
        <div>{children}</div>
        {footer && <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)' }}>{footer}</div>}
      </div>
    </div>
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>{message}</p>
    <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
      <Button variant="ghost" onClick={onClose}>{cancelLabel}</Button>
      <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
    </div>
  </Modal>
);

export default Modal;
