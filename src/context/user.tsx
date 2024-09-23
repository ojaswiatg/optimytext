"use client";

import { TUser, TUserContext } from "@/lib/types";
import { createContext, useState } from "react";

export const UserContext = createContext<TUserContext>({} as TUserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<TUser>({ email: "" });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
