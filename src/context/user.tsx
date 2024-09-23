"use client";

import { USER_CONTEXT_INIT } from "@/lib/constants";
import { TUserContext } from "@/lib/types";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<TUserContext>(USER_CONTEXT_INIT);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = createContext(UserContext);
