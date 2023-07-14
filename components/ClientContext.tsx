"use client"
import React, { createContext, useContext, useState } from 'react'

const ClientContext = createContext<any>(null);

export const useLoginModal = (): { opened: boolean, onOpen: () => void, onClose: () => void } => {
  const { loginModal } = useContext(ClientContext);
  return loginModal;
}

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [loginOpened, setLoginOpened] = useState(false);

  return (
    <ClientContext.Provider value={{
      loginModal: {
        opened: loginOpened,
        onOpen: () => setLoginOpened(true),
        onClose: () => setLoginOpened(false),
      }
    }}>
      {children}
    </ClientContext.Provider>
  )
}
