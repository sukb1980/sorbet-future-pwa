/* Toast System — Sorbet Future Fit Design System */
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const icons = {
  success: <FiCheckCircle size={18} />,
  error: <FiAlertCircle size={18} />,
  info: <FiInfo size={18} />,
  warning: <FiAlertTriangle size={18} />,
};

export const ToastContainer = () => {
  const { toasts, dismissToast } = useAppContext();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {icons[toast.type] || icons.info}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button onClick={() => dismissToast(toast.id)} style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }} aria-label="Dismiss">
            <FiX size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
