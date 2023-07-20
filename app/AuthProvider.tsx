"use client"
import React, { useState, useEffect, useContext, createContext } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import type { User } from '@prisma/client';

import { getUser } from '@/actions/user';

const ClientAuthContext = createContext<any>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClientAuthProvider>
        {children}
      </ClientAuthProvider>
    </SessionProvider>
  )
}

export const useAuth = (): User => useContext(ClientAuthContext)

function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | User>(null)
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      return setUser(null)
    }

    async function loadUser() {
      const user = await getUser()
        .then(res => setUser(res))
        .catch(err => setUser(null));

      return user;
    }

    loadUser();
  }, [status])

  return (
    <ClientAuthContext.Provider value={user}>
      {children}
    </ClientAuthContext.Provider>
  )
}