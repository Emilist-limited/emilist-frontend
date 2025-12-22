"use client";

import { createContext, useState, useCallback, ReactNode } from "react";

export interface ToastStateProps {
  id: string;
  message: string;
  type: "success" | "error";
  duration?: number;
  autoClose?: boolean;
}

interface ToastContextType {
  toasts: ToastStateProps[];
  showToast: (toast: Omit<ToastStateProps, "id">) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

const ToastState = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastStateProps[]>([]);

  const showToast = useCallback(
    ({
      message,
      type,
      duration = 3000,
      autoClose = true,
    }: Omit<ToastStateProps, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [
        ...prev,
        { id, message, type, duration, autoClose },
      ]);
      if (autoClose && duration) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastState;
