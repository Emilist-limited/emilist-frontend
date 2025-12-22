"use client";

import AuthState from "@/lib/context/AuthState";
import CartState from "@/lib/context/CartState";
import ChatState from "@/lib/context/ChatState";
import CompareMaterialState from "@/lib/context/CompareMaterialState";
import CompareState from "@/lib/context/CompareState";
import { SocketContextProvider } from "@/lib/context/SocketContext";
import ToastState from "@/lib/context/ToastState";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastState>
      <CompareMaterialState>
        <CompareState>
          <CartState>
            <AuthState>
              <ChatState>
                <SocketContextProvider>{children}</SocketContextProvider>
              </ChatState>
            </AuthState>
          </CartState>
        </CompareState>
      </CompareMaterialState>
    </ToastState>
  );
};

export default Providers;
